import { Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./order.dto";
import { EventPattern, Payload } from "@nestjs/microservices";
import { RabbitMqPatterns } from "../app.enums";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @EventPattern(RabbitMqPatterns.ORDER_CREATED)
    async handleOrderCreation(
        @Payload() dto: CreateOrderDto
    ) {
        return this.orderService.handleCreateOrder(dto);
    }
}