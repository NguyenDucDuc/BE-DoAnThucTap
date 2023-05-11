import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.enableCors()

  // create data

  const appService = app.get(AppService)
  appService.autoCreateData()

  await app.listen(3005, () => {
    console.log('server is running ......100%')
  });
}
bootstrap();
