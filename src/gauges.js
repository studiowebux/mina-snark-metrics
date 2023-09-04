module.exports = (n_block) => [
  {
    key: "min_snark_fee",
    help: `Minimum Snark Fee for latest ${n_block} blocks`,
  },
  {
    key: "max_snark_fee",
    help: `Maximum Snark Fee for latest ${n_block} blocks`,
  },
  {
    key: "avg_snark_fee",
    help: `Average Snark Fee for latest ${n_block} blocks`,
  },
  {
    key: "median_snark_fee",
    help: `Median Snark Fee for latest ${n_block} blocks`,
  },
  {
    key: "count_snark_fee",
    help: `Number of Snark Fee for latest ${n_block} blocks`,
  },
  {
    key: "non_zero_count_snark_fee",
    help: `Number of non-zero Snark Fee for latest ${n_block} blocks`,
  },
  {
    key: "current_snark_fee",
    help: `Current Snark Fee set for this worker`,
  },
  {
    key: "start_block_height",
    help: `Starting Block height`,
  },
  {
    key: "end_block_height",
    help: `Ending Block height`,
  },
  // Computed metrics
  {
    key: "diff_min",
    help: "Difference between current SNARK fee and the minimum, positive number means that the current fee is higher.",
  },
  // Computed metrics
  {
    key: "diff_max",
    help: "Difference between current SNARK fee and the maximum, positive number means that the current fee is higher.",
  },
  // Computed metrics
  {
    key: "diff_avg",
    help: "Difference between current SNARK fee and the average, positive number means that the current fee is higher.",
  },
  // Computed metrics
  {
    key: "diff_median",
    help: "Difference between current SNARK fee and the median, positive number means that the current fee is higher.",
  },
  {
    key: "n_block",
    help: "Number of blocks used to get the data",
  },
  {
    key: "non_zero_occurence_snark_fee",
    help: "Non Zero Snark fee with highest occurence",
  },
  {
    key: "occurence_snark_fee",
    help: "Snark fee with highest occurence",
  },
  {
    key: "diff_non_zero_occurence",
    help: "Difference between current SNARK fee and the Non Zero Occurence, positive number means that the current fee is higher.",
  },
  {
    key: "total_provers",
    help: "Total number of provers",
  },
  {
    key: "total_unique_provers",
    help: "Total number of unique provers",
  },
];
