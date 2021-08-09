import { CustomErrorAbstract } from './custom-error.abstract';

export class BadRequestError extends CustomErrorAbstract {
    readonly statusCode = 400;

    constructor(public error: string) {
        super(error);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.error }];
    }
}