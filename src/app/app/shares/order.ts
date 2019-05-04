
import {Book} from './book';
import {Status} from './status';
export {Book} from './book';
export {Status} from './status';

export class Order {

    //public books: Book[]
    constructor(public id: number, public user_id: number, public date: Date, public total_amount: number, public taxes : number,
                public order_items: Order[], public statuses?: Status[]) {
    }

}

