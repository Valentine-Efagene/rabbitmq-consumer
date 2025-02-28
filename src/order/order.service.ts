import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./order.dto";

@Injectable()
export class OrderService {
    constructor(
    ) { }

    async handleCreateOrder(dto: CreateOrderDto) {
        console.log('Order creation being handled:', dto);

        return { message: 'Order creation being handled' };
    }
}