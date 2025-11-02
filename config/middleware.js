import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setupMiddleware = (app) => {
  app.use(session({
    secret: 'adminjs-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = process.env.FRONTEND_URL 
        ? [process.env.FRONTEND_URL] 
        : ['http://localhost:3000', 'http://localhost:3001'];
      
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true
  }));

  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

