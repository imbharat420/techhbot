const errorHandler = (error: any) => {
  if (error.response) {
    console.log(`Error Data: ${error.response.data}`);
    console.log(`Error Status: ${error.response.status}`);
  } else if (error.request) {
    console.log(`Error Request: ${error.request}`);
  } else {
    console.log(`Error Message: ${error.message}`);
  }
};

export default errorHandler;