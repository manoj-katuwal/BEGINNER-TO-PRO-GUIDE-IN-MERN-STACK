export const successResponse = (res, statusCode , message , data ) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data: null,
      timestamp: new Date().toISOString(),
    });

}