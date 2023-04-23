async function getFullResponseFromAPI(success) {
  try {
    if (success) {
      return {status: 200, body: 'Success'};
    } else {
      throw new Error('The fake API is not working currently');
    }
  } catch (error) {
    throw error;
  }
}

export default getFullResponseFromAPI;

