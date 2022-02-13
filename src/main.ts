import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  await app.listen(port, () =>
    console.info('[INFO] Server is running on http://localhost:3333'),
  );
}
bootstrap();
