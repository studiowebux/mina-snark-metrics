const {
  blockHeightQuery,
  feesQuery,
  snarkFeeQuery,
  proversQuery,
} = require("./queries");
const { RecursiveQuery, Query } = require("./query");
const conversion = process.env.CONVERSION || 1000000000;
const n_block = process.env.N_BLOCKS || 100;

module.exports = async function getReadings() {
  let response = [];
  const blockHeight = await Query(blockHeightQuery).then(
    (json) => json.data.daemonStatus.blockchainLength
  );
  const provers = await RecursiveQuery(
    proversQuery,
    { blockHeight },
    blockHeight - n_block,
    "blockHeight"
  ).then((result) => result.flatMap((sj) => sj.prover));
  response.push(["total_provers", provers.length]);
  response.push(["total_unique_provers", [...new Set(provers)].length]);

  const fees = await RecursiveQuery(
    feesQuery,
    { blockHeight },
    blockHeight - n_block,
    "blockHeight"
  ).then((result) => result.flatMap((sj) => parseInt(sj.fee)));

  const current_snark_fee = await Query(snarkFeeQuery).then(
    (json) => json.data.daemonStatus.snarkWorkFee
  );
  response.push(["current_snark_fee", current_snark_fee / conversion]);

  if (fees.length > 0) {
    //   Compute Metrics
    const min = fees.reduce((lowest, fee) => {
      if (fee < lowest) lowest = fee;
      return lowest;
    }, 0);
    const max = fees.reduce((highest, fee) => {
      if (fee > highest) highest = fee;
      return highest;
    }, 0);
    const avg =
      fees.reduce((sum, fee) => {
        return sum + fee;
      }, 0) / fees.length;
    const median = fees.sort()[Math.floor(fees.length / 2)];
    const count = fees.length;
    const non_zero_count = fees.filter((fee) => fee != 0).length;
    const occurence_snark_fee = fees
      .sort(
        (a, b) =>
          fees.filter((v) => v === a).length -
          fees.filter((v) => v === b).length
      )
      .pop();
    const non_zero_occurence_snark_fee = fees
      .filter((fee) => fee != 0)
      .sort(
        (a, b) =>
          fees.filter((v) => v === a).length -
          fees.filter((v) => v === b).length
      )
      .pop();

    //   Set Metrics
    response.push(["min_snark_fee", min / conversion]);
    response.push(["max_snark_fee", max / conversion]);
    response.push(["avg_snark_fee", avg / conversion]);
    response.push(["median_snark_fee", median / conversion]);
    response.push(["count_snark_fee", count]);
    response.push(["non_zero_count_snark_fee", non_zero_count]);
    response.push([
      "non_zero_occurence_snark_fee",
      non_zero_occurence_snark_fee / conversion,
    ]);
    response.push(["occurence_snark_fee", occurence_snark_fee / conversion]);

    response.push(["diff_min", (current_snark_fee - min) / conversion]);
    response.push(["diff_max", (current_snark_fee - max) / conversion]);
    response.push(["diff_avg", (current_snark_fee - avg) / conversion]);
    response.push(["diff_median", (current_snark_fee - median) / conversion]);
    response.push([
      "diff_non_zero_occurence",
      (current_snark_fee - non_zero_occurence_snark_fee) / conversion,
    ]);
  } else {
    // No fees found.
    response.push(["min_snark_fee", 0]);
    response.push(["max_snark_fee", 0]);
    response.push(["avg_snark_fee", 0]);
    response.push(["median_snark_fee", 0]);
    response.push(["count_snark_fee", 0]);
    response.push(["non_zero_count_snark_fee", 0]);
    response.push(["non_zero_occurence_snark_fee", 0]);
    response.push(["occurence_snark_fee", 0]);

    response.push(["diff_min", 0]);
    response.push(["diff_max", 0]);
    response.push(["diff_avg", 0]);
    response.push(["diff_median", 0]);
    response.push(["diff_non_zero_occurence", 0]);
  }

  response.push(["start_block_height", blockHeight]);
  response.push(["end_block_height", blockHeight - n_block]);
  response.push(["n_block", n_block]);

  return { response };
};
