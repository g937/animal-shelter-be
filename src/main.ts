import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import packageJson from '../package.json';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle(packageJson.title)
        .setDescription(packageJson.description)
        .setVersion(packageJson.version)
        .addBearerAuth()
        .build();

    const configService = app.get(ConfigService);
    app.use(cookieParser());
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(configService.get('DOCUMENTATION_URL') || 'api', app, document);
    await app.listen(configService.get('PORT') || 3000);
}
bootstrap();