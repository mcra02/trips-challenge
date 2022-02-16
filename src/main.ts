import {
  ValidationPipe
} from '@nestjs/common';
import {
  NestFactory
} from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule
} from '@nestjs/swagger';
import {
  AppModule
} from './app.module';
import {
  LoggerService
} from './utils/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes( new ValidationPipe );

  const options = new DocumentBuilder()
    .setTitle('Search Youtube API')
    .setDescription('The Search Youtube API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 80);

  LoggerService.log(`http://0.0.0.0:${process.env.PORT || 80}/api`, 'HTTP API');
  LoggerService.log(
    `http://0.0.0.0:${process.env.PORT || 80}/api/swagger`,
    'SWAGGER DOC'
  );
}
bootstrap();
