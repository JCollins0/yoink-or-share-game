import { HTTP_CODES } from './config.js';

export function makeError(errorCode) {
  return { errorCode: errorCode };
}

export function validateFields(...fields) {
  return fields.every((val) => val !== undefined && val !== null);
}

export function handleServerError(response, err) {
  console.log(err);
  return response.status(HTTP_CODES.SERVER_ERROR.code).json(makeError(HTTP_CODES.SERVER_ERROR.code));
}

export function createServiceResponse(responseCode, response) {
  return { resCode: responseCode, res: response };
}
