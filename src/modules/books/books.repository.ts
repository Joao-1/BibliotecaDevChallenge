import logger from "logs/logger";
import { AbstractRepository, EntityRepository } from "typeorm";
import { DataBaseError } from "../../helpers/nestHelpers/exceptions/errorsExceptions";
import Book from "./books.entity";
import IBook from "./interfaces/book.interface";

@EntityRepository(Book)
export default class BookRepository extends AbstractRepository<Book> {
	async create(book: IBook) {
		try {
			const newBook = await this.repository
				.createQueryBuilder()
				.insert()
				.values({
					title: book.title,
					publishingCompany: book.publishingCompany,
					imgURL: book.imageURL,
					authors: book.authors.toString(),
				})
				.returning("*")
				.execute();
			return newBook.raw[0];
		} catch (error) {
			throw new DataBaseError(
				"An error occurred when trying to insert a new record into the database",
				error,
				"BookRepository"
			);
		}
	}

	async findByName(firstName: string, lastName: string) {
		logger.debug.debug(firstName, lastName);
		// const test = await this.repository.findOne({ title: firstName, author: lastName });
		// return test;
	}

	async checkIfBookAlreadyExists(bookTitle: string) {
		const possibleBooks = await this.repository.find({ where: { title: bookTitle } });
		return possibleBooks.some((book) => {
			return bookTitle === book.title;
		});
	}
}
