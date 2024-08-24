import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    server: {
      isProd: process.env.NODE_ENV === 'production',
      port: parseInt(process.env.PORT, 10) || 3001,
    },
    jwtSecret: process.env.JWT_SECRET,
    swagger: {
      path: process.env.SWAGGER_PATH,
      enable:true
    },
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5433,
    },
    services:{
      swapi:process.env.SW_API_URL
    }
  };
});
