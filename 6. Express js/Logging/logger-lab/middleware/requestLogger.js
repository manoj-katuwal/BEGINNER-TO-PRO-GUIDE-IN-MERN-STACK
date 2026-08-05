// import logger from '../utils/Logger.js';

import { logger } from "../utils/Logger.js";

export const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.url} ${res.statusCode} ${res.statusMessage}  ${res.getHeaders()} ${duration}ms`);
    next();
}


