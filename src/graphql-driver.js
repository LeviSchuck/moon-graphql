import Moon from 'moon';
function GraphQL({endpoint, headers = [], method = "POST"}) {
  let resultGlobal = {
    error: "No query run yet",
  };
  return {
    input() {
      return resultGlobal;
    },
    async output({variables, after = (() => ({})), query, mutation}) {
      let fetchData = {};
      if (query) {
        fetchData.query = query;
        // fetchData.operationName = 'query';
      }
      if (mutation) {
        fetchData.query = mutation;
        fetchData.operationName = 'mutation';
      }
      if (variables) {
        fetchData.variables = JSON.stringify(variables)
      }
      console.log(endpoint)
      
      try {
        let response = await fetch(endpoint, {
          body: JSON.stringify(fetchData),
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          method,
        });
        let json = await response.json();
        resultGlobal = {
          success: json.data
        };
        Moon.run(after);
      } catch (e) {
        console.error(err);
        resultGlobal = {
          error: `Error converting body from json: ${err}`,
          rawError: e,
        };
        Moon.run(after);
      }
    }
  };
}

export default GraphQL;