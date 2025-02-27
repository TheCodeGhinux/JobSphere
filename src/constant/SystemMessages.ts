export const USER_CREATED_SUCCESSFULLY = 'User Created Successfully';
export const USER_CREATED = 'User Created Successfully';
export const FAILED_TO_CREATE_USER = 'Error Occured while creating user, kindly try again';
export const ERROR_OCCURED = 'Error Occured Performing this request';
export const USER_ACCOUNT_EXIST = 'Account with the specified email exists';
export const USER_ACCOUNT_DOES_NOT_EXIST = "Account with the specified email doesn't exist";
export const UNAUTHENTICATED_MESSAGE = 'User is currently unauthorized, kindly authenticate to continue';
export const USER_NOT_FOUND = 'User not found!';
export const INVALID_PASSWORD = 'Invalid password';
export const LOGIN_SUCCESSFUL = 'Login successful';
export const LOGIN_ERROR = 'An error occurred during login';
export const FORBIDDEN_ACTION = 'You do not have the permission to perform this action';

export const FAILED_TO_JOB = 'Failed to create job';
export const FAILED_TO_UPDATE_COMPANY = 'Failed to update company';

export const RESOURCE_NOT_FOUND = resource => {
  return `${resource} does not exist`;
};

export const BAD_REQUEST = 'Bad request error';
export const INVALID_CREDENTIALS = 'Invalid credentials';

export const RESOURCE_ALREADY_EXISTS = resource => {
  return `${resource} already exist`;
};
export const INVALID_RESOURCE = (resource: string) => {
  return `${resource} is invalid`;
};
export const RESOURCE_FOUND_SUCCESSFULLY = (resource: string) => {
  return `${resource} found successfully`;
};
