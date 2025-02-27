import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { AppModule } from '@/app.module';
import { initializeDataSource } from '@db/data-source';
import { SeedingService } from '@db/seeding/seeding.service';
import { ResponseInterceptor } from '@shared/inteceptors/response.interceptor';
import findAvailablePort from '@helpers/find-port';
import { SanitizeUserInterceptor } from './shared/inteceptors/user-res.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);

  const dataSource = app.get(DataSource);

  try {
    await initializeDataSource();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  }

  const seedingService = app.get(SeedingService);
  await seedingService.seedDatabase();

  app.enable('trust proxy');
  app.useLogger(logger);
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1', { exclude: ['/', 'health', 'api', 'api/v1', 'api/docs', 'probe'] });
  app.useGlobalInterceptors(new SanitizeUserInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('HNG Boilerplate')
    .setDescription('API Doc from team Starlight')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  let port = app.get<ConfigService>(ConfigService).get<number>('server.port');

  // let port = configService.get<number>('PORT', 3000);

  port = await findAvailablePort(port);
  await app.listen(port);

  logger.log({ message: 'server started 🚀', port, url: `http://localhost:${port}/api/v1` });
}
bootstrap().catch(err => {
  console.error('Error during bootstrap', err);
  process.exit(1);
});
