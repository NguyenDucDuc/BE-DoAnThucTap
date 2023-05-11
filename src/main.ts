import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.enableCors()
  await app.listen(3005, () => {
    console.log('server is running ......100%')
  });
}
bootstrap();