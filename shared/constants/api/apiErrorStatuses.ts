export const ResponseStatus: {
  [key: string]: number
} = {
  OK: 200,
  BAD_REQUEST_ERROR: 400,
  AUTH_FAILURE_ERROR: 401,
  FORBIDDEN_ERROR: 403,
  NOT_FOUND_ERROR: 404,
  INTERNAL_SERVER_ERROR: 500,
}