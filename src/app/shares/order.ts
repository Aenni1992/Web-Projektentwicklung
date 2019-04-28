
import {Book} from './book';

export class Order {

    constructor(public id: number, public user_id: number, public date: Date, public total_amount: number, public taxes : number, public books: Book[]) {
    }

}

