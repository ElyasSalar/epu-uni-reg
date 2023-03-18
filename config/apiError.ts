import { NextApiResponse } from "next"
import { ResponseStatus } from "../shared/constants/api/apiErrorStatuses"
import { ErrorType } from "../shared/constants/api/apiErrorTypes"

export abstract class ApiError extends Error {
  constructor(
    public type: typeof ErrorType[keyof typeof ErrorType],
    public override message: string = "error"
  ) {
    super(type)
  }

  public static handle(err: ApiError, res: NextApiResponse): void {
    if (!(err instanceof ApiError)) {
      err = new InternalError()
    }

    const status = ResponseStatus[err.type]
    res.status(status).json({
      status,
      title: err.type,
      message: err.message,
    })
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials") {
    super(ErrorType.AUTH_FAILURE_ERROR, message)
  }
}

export class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(ErrorType.INTERNAL_SERVER_ERROR, message)
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(ErrorType.BAD_REQUEST_ERROR, message)
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND_ERROR, message)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Permission denied") {
    super(ErrorType.FORBIDDEN_ERROR, message)
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message)
  }
}

export class NoDataError extends ApiError {
  constructor(message = "No data available") {
    super(ErrorType.NO_DATA, message)
  }
}