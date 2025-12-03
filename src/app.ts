// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import middlewareRoutes from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { notFoundRoutes } from './app/middleware/notFoundRoutes';

const app: Application = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: [
      'x-trace-id',
      'x-correlation-id',
      'ETag',
      'if-none-match',
      'if-match',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);
app.use(helmet());

// 1. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/api/v1', middlewareRoutes);

app.get('/', (_, res) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Arvion server is running successfully',
  });
});

// Error Handlers
app.use(globalErrorHandler);
app.use(notFoundRoutes);

export default app;
