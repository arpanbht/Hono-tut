export const sendSuccessResponse = (c: any, data: any, message: string, statusCode = 200) => {
  return c.json({
    success: "true",
    message,
    data,
  }, statusCode);
}

export const sendErrorResponse = (c: any, error: any, message: string, statusCode = 500) => {
  return c.json({
    success: "false",
    message,
    error: error.message || "An Error occurred",
  }, statusCode);
}