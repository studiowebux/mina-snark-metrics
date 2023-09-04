function Query(query, variables = {}) {
  return fetch(process.env.ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((r) => r.json());
}

async function RecursiveQuery(query, variables, target, targetKey, acc = []) {
  let response = await Query(query, variables).then(
    (json) => json?.data?.block?.snarkJobs || [] // TODO: hardcoded
  );
  if (variables[targetKey] >= target) {
    variables[targetKey] = variables[targetKey] - 1; // TODO: Not dynamic.
    response = [
      ...response,
      await RecursiveQuery(query, variables, target, targetKey, acc),
    ];
  }

  response = [...acc, ...response];

  return response.flat(Infinity);
}

module.exports = { Query, RecursiveQuery };
