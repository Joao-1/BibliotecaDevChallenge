import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Logger } from "winston";

export class ServerError {
	constructor(public message: string, public error: unknown, public local: string) {}
}

@Catch(HttpException, ServerError)
export class HttpErrorFilter implements ExceptionFilter {
	constructor(private logger: Logger) {}
	catch(exception: HttpException | ServerError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const { url, method } = ctx.getRequest();
		const response = ctx.getResponse();

		let statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		let message = exception instanceof HttpException ? exception.message : "Internal server error";

		if (exception instanceof ServerError) {
			const { message, error, local } = exception;
			this.logger.error({
				msg: message,
				error,
				local,
				requestDetails: { path: url, method: method },
			});
		}

		response.status(statusCode).json({
			statusCode,
			message,
		});
	}
}
