import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const server = configService.get('config.server');
  const swagger = configService.get('config.swagger');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swagger.enable) {
    const config = new DocumentBuilder()
      .setTitle('Movies API Documentation')
      .setDescription(
        'This API was created for the management of a different movies and series',
      )
      .setVersion('1.0.1')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'authorization',
        description: 'Enter JWT token',
        in: 'header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${swagger.path}`, app, document);
  }

  await app.listen(server.port, () => {
    console.log(
      process.env.NODE_ENV !== 'production'
        ? `App running on: http://localhost:${server.port}`
        : 'App running',
    );
  });
}
bootstrap();
