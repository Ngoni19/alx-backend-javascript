
function handleResponseFromAPI(promise) {
  const body = { status: 200, body: 'success' };

  promise
    .then(() => {
      console.log('Got a response from the API');
      return body;
    })
    .catch((error) => {
      console.log('Got an error from the API');
      return error;
    });
}

export default handleResponseFromAPI;

