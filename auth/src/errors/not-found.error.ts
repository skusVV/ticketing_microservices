import { CustomErrorAbstract } from './custom-error.abstract';

export class NotFoundError extends CustomErrorAbstract {
    readonly reason = 'Not Found';
    readonly statusCode = 404;

    constructor() {
        super('Not Found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}