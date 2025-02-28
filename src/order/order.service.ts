import { Injectable, Logger } from "@nestjs/common";
import { CreateOrderDto } from "./order.dto";


@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);

    constructor(
    ) { }

    orders = [
        {
            email: 'XXXXXXXXXXXXX',
            productName: 'Product 1',
            quantity: 100,
        },
        {
            email: 'XXXXXXXXXXXXX',
            productName: 'Product 2',
            quantity: 200,
        },
        {
            email: 'XXXXXXXXXXXXX',
            productName: 'Product 3',
            quantity: 300,
        },
    ];

    async handleCreateOrder(dto: CreateOrderDto) {
        this.orders.push(dto);

        this.logger.log('Order creation being handled:', dto);
    }

    async handleFetchOrders() {
        this.logger.log('Fetching orders');

        return this.orders
    }
}