import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class LoggerService {
  private logger; 

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new transports.Console({
        format: format.simple(),
      }));
    }
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}
