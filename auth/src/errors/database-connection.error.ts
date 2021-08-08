import { CustomErrorAbstract } from './custom-error.abstract';

export class DatabaseConnectionError extends CustomErrorAbstract {
    readonly reason = 'Connection DB Error';
    readonly statusCode = 500;

    constructor() {
        super('Connection DB Error');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}