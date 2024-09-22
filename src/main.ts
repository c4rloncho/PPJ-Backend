import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  app.enableCors({
    origin:
      process.env.CORS_URL || 'https://chipper-meerkat-ae83d8.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Content-Type, Accept, Authorization, Apollo-Require-Preflight',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
