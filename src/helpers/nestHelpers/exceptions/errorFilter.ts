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
		const response = ctx.getResponse();

		let statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		let message = exception instanceof HttpException ? exception.message : "Internal server error";

		if (exception instanceof ServerError) {
			this.logger.error({ msg: exception.message, _error: exception.error, label: exception.local });
		}

		// {
		// 	timestamp: new Date().toISOString(),
		// 	path: request.url,
		// 	method: request.method,
		// 	message: exception.message,
		// 	local: exception.local,
		// }

		const ErrorResponse: any = {
			statusCode,
			message,
		};

		response.status(statusCode).json(ErrorResponse);
	}
}
