
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMqQueue } from './app.enums';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: RabbitMqQueue.ORDERS,
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
}
bootstrap();