import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Logger } from "winston";
import { ServerErrors } from "./errorsExceptions";

interface IErrorResponse {
	statusCode: number;
	message: string;
	error?: string;
}

@Catch(HttpException, ServerErrors)
export default class HttpErrorFilter implements ExceptionFilter {
	// eslint-disable-next-line no-unused-vars
	constructor(private logger: Logger) {}

	catch(exception: HttpException | ServerErrors, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const { url, method } = ctx.getRequest();
		const response = ctx.getResponse();

		let responseDefault = {
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
		} as IErrorResponse;

		if (exception instanceof HttpException) responseDefault = exception.getResponse() as IErrorResponse;
		if (exception instanceof ServerErrors) {
			const { message, error, place } = exception;
			this.logger.error({
				msg: message,
				error,
				place,
				requestDetails: { path: url, method },
			});
		}

		response.status(responseDefault.statusCode).json(responseDefault);
	}
}
