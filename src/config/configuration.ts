import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  server: {
    isProd: process.env.NODE_ENV === 'production',
    port: parseInt(process.env.PORT, 10) || 3001,
    timeout: process.env.HTTP_TIMEOUT,
    maxRedirects: process.env.HTTP_MAX_REDIRECTS
  },
  jwtSecret: process.env.JWT_SECRET,
  swagger: {
    path: process.env.SWAGGER_PATH,
    enable: true,
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    user:process.env.DATABASE_USER || 'root',
    password:process.env.DATABASE_PASSWORD || 'root',
    name:process.env.DATABASE_NAME || 'test',
  },
  services: {
    swapi: process.env.SW_API_URL,
  },
}));
