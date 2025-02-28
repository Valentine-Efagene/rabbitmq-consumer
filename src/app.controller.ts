import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { RabbitMqPatterns } from './app.enums';
import { CreateOrderDto } from './order/order.dto';
import { OrderService } from './order/order.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly orderService: OrderService,

  ) { }

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: number[]): Promise<number> {
    console.log('Adding ' + data.toString());
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern({ cmd: 'numbers' })
  numbers(data: number[]): Observable<number> {
    console.log('Adding ' + data.toString());
    return from([1, 2, 3, 4, 5]);
  }

  @EventPattern('user_created')
  async handleEvent(data: Record<string, unknown>) {
    console.log('Event data: ' + data);

    return {
      name: 'John Doe',
      age: 30
    }
  }
}
