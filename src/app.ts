import express from 'express';
import cors from 'cors';
import routes from '@/routes';

export const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

// Routes
app.get('/', (_, res) => {
  res.send('API is running...');
});

app.use('/api/v1', routes);