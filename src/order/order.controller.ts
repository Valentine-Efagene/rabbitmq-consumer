import { Controller, Logger } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./order.dto";
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { RabbitMqPatterns } from "../app.enums";

@Controller('orders')
export class OrderController {
    private readonly logger = new Logger(OrderController.name);

    constructor(
        private readonly orderService: OrderService,
    ) { }

    @EventPattern(RabbitMqPatterns.ORDER_CREATED)
    async handleOrderCreation(
        @Payload() dto: CreateOrderDto
    ) {
        return this.orderService.handleCreateOrder(dto);
    }

    @MessagePattern({ cmd: RabbitMqPatterns.FETCH_ORDERS })
    async handleFetchOrders(
        @Ctx() context: RmqContext
    ) {
        //this.logger.log(context.getMessage());
        return this.orderService.handleFetchOrders();
    }
}