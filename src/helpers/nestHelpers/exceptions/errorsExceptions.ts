/* eslint-disable max-classes-per-file */
import { HttpException, HttpStatus } from "@nestjs/common";

export namespace CommumError {
	export class WithThisIdDoesNotExists extends HttpException {
		constructor(bookId: number) {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: `There is no book id ${bookId} registered in the database`,
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}
}

export class ServerErrors {
	// eslint-disable-next-line no-unused-vars
	constructor(public message: string, public error: unknown, public place: string) {}
}

export class DataBaseError extends ServerErrors {
	constructor(message: string, error: unknown, repository: string) {
		super(message, error, repository);
	}
}

export namespace ServicesProvidersError {
	export class ImgurError extends ServerErrors {
		constructor(error: unknown, place: string) {
			super("An error occurred while consuming the Imgur service.", error, place);
		}
	}
}

export namespace RegisterBookError {
	export class BookImageNotProvided extends HttpException {
		constructor() {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: "An image of the book is required for registration",
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}
	export class BookAlreadyExists extends HttpException {
		constructor(bookTitle: string) {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: `There is already a book with ${bookTitle} title`,
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}
}

export namespace UpdateBookError {
	export class BookWithThisIdDoesNotExists extends CommumError.WithThisIdDoesNotExists {
		constructor(bookId: number) {
			super(bookId);
		}
	}
}

export namespace DeleteBookError {
	export class BookWithThisIdDoesNotExists extends CommumError.WithThisIdDoesNotExists {
		constructor(bookId: number) {
			super(bookId);
		}
	}
}
