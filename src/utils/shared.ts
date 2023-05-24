export function formatError(errors: any) {
  const myErrors = {};

  errors.forEach((error) => {
    // console.log(error);
    myErrors[error.property] = error.constraints;
  });

  return myErrors;
}

export interface CreateResponseType {
  statusCode: number;
  message: string;
  data?: any;
}

export function createResponse(
  statusCode: number,
  message: string,
  data?: any,
): CreateResponseType {
  const resp: CreateResponseType = {
    statusCode: statusCode,
    message: message,
    data: [],
  };
  if (data && !Array.isArray(data)) {
    data = [data];
    if (data.length > 0) {
      resp.data = data;
    }
  } else {
    resp.data = data;
  }

  return resp;
}
