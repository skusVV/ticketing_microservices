import { ValidationError } from 'express-validator';
import { CustomErrorAbstract } from './custom-error.abstract';

export class RequestValidationError extends CustomErrorAbstract {
    readonly statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid params');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => ({ message: error.msg, field: error.param }));
    }
}

