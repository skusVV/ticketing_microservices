import { CustomErrorAbstract } from './custom-error.abstract';

export class NotAuthorizedError extends CustomErrorAbstract {
    readonly reason = 'Not Authorized';
    readonly statusCode = 401;

    constructor() {
        super('Not Authorized' );

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}