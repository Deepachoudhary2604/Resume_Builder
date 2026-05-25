import helmet from "helmet";
import rateLimit from "express-rate-limit";


export const configureSecurity = (app) => {
  // Set security HTTP headers
  app.use(helmet({
    crossOriginResourcePolicy: false,
  }));

  // Limit requests from same API
  const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: "Too many requests from this IP, please try again in an hour!",
  });
  app.use("/api", limiter);

};
