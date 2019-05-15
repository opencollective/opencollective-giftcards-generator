import app from './app';
import { logger } from './logger';
import { PORT } from '../constants/env';

app.listen(PORT, err => {
  if (err) {
    throw err;
  }

  logger.info(`Ready on http://localhost:${PORT}`);
});
