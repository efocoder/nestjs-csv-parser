import { BadRequestException } from '@nestjs/common';

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

export function formatDate(dateString) {
  const splitDate = dateString.split('/');

  return new Date(+splitDate[2], splitDate[1] - 1, +splitDate[0]);
}

export function validateDates(startDate, endDate) {
  if (startDate > endDate)
    throw new BadRequestException({
      start_date: 'start_date cannot be greater than end_date',
    });
}
