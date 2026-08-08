const getRequestContext = (req) => {
  return {
    requestId: req.requestId,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  };
};

export default getRequestContext;
