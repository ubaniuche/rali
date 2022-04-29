import ServerResponse from "../helpers/ServerResponse";

/**
* function to check if request body is empty
*/

const emptyBody = (request, response, next) => {

    console.log('checking for empty body')
    const { body } = request;
  
    if (Object.keys(body).length === 0) {
  
      ServerResponse.failure(request, response, 400, { error: 'empty request body' });
  
    } else {
  
      next();
  
    }
  
  };

  export default emptyBody