import { AbstractRepository, EntityRepository } from "typeorm";
import { DataBaseError } from "./../../helpers/nestHelpers/exceptions/errorsExceptions";
import { Book } from "./books.entity";
import { IBook } from "./interfaces/book.interface";

@EntityRepository(Book)
export class BookRepository extends AbstractRepository<Book> {
	async create(book: IBook) {
		try {
			return this.repository.insert({
				title: book.title,
				publishingCompany: book.publishingCompany,
				imgURL: book.imageURL,
				authors: book.authors.toString(),
			});
		} catch (error) {
			throw new DataBaseError(
				"An error occurred when trying to insert a new record into the database",
				error,
				"BookRepository"
			);
		}
	}

	async findByName(firstName: string, lastName: string) {
		const test = await this.repository.findOne();
		return test;
	}

	async checkIfBookAlreadyExists(bookTitle: string) {
		const possibleBooks = await this.repository.find({ where: { title: bookTitle } });
		return possibleBooks.some((book) => {
			return bookTitle === book.title;
		});
	}
}
