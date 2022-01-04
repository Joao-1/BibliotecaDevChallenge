import { HttpException } from "@nestjs/common";
import { ServerError } from "./errorFilter";

export class DataBaseError extends ServerError {
	constructor(message: string, error: unknown, repository: string) {
		super(message, error, repository);
	}
}

export namespace ServicesProvidersError {
	export class ImgurError extends ServerError {
		constructor(error: unknown, place: string) {
			super("An error occurred while consuming the Imgur service.", error, place);
		}
	}
}

export namespace RegisterBookError {
	export class BookAlreadyExists extends HttpException {
		constructor(bookTitle: string) {
			super(`There is already a book with ${bookTitle} title`, 422);
		}
	}
}
