import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Logger } from "winston";
import { ServerError } from "./errorsExceptions";

@Catch(HttpException, ServerError)
export default class HttpErrorFilter implements ExceptionFilter {
	// eslint-disable-next-line no-unused-vars
	constructor(private logger: Logger) {}

	catch(exception: HttpException | ServerError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const { url, method } = ctx.getRequest();
		const response = ctx.getResponse();

		const statusCode =
			exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const msg = exception instanceof HttpException ? exception.message : "Internal server error";

		if (exception instanceof ServerError) {
			const { message, error, place } = exception;
			this.logger.error({
				msg: message,
				error,
				place,
				requestDetails: { path: url, method },
			});
		}

		response.status(statusCode).json({
			statusCode,
			msg,
		});
	}
}
