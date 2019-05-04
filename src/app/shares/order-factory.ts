import {Order} from './order';

export class OrderFactory {

    static empty(): Order {
        return new Order(null, null, null, null, null, [])
    }


  /*  static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.user_id,
            rawOrder.date,
            rawOrder.total_amount,
            rawOrder.taxes,
            rawOrder.books
        );
    }*/


    static fromObject(id, user_id, date, total_amount, taxes, books): Order {
        return new Order(
            id,
            user_id,
            date,
            total_amount,
            taxes,
            books
        );
    }
}

