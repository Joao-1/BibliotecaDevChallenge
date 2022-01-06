import { AbstractRepository, EntityRepository } from "typeorm";
import { DataBaseError } from "../../helpers/nestHelpers/exceptions/errorsExceptions";
import Book from "./books.entity";
import IBook from "./interfaces/book.interface";

@EntityRepository(Book)
export default class BookRepository extends AbstractRepository<Book> {
	async insertNewBook(book: IBook) {
		try {
			const newBook = await this.repository
				.createQueryBuilder()
				.insert()
				.values({
					title: book.title,
					publishingCompany: book.publishingCompany,
					imageURL: book.imageURL,
					authors: book.authors.toString(),
				})
				.returning("*")
				.execute();
			return newBook.raw[0];
		} catch (error) {
			throw new DataBaseError(
				"An error occurred when trying to insert a new record into the database",
				error.message,
				"BookRepository"
			);
		}
	}

	async getAllBooks() {
		try {
			return this.repository.createQueryBuilder().getMany();
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to get all books from the database",
				error.message,
				"BookRepository"
			);
		}
	}

	async updateABook(bookId: number, newValues: IBook) {
		try {
			const bookUpdated = await this.repository
				.createQueryBuilder()
				.update()
				.set(JSON.parse(JSON.stringify(newValues)))
				.where("id = :id", { id: bookId })
				.returning("*")
				.execute();
			return bookUpdated.raw[0];
		} catch (error) {
			throw new DataBaseError(
				"An error occurred when trying to update a book in the database.",
				error.message,
				"BookRepository"
			);
		}
	}

	async deleteABook(bookId: number) {
		try {
			return this.repository.createQueryBuilder().delete().where("id = :id", { id: bookId }).execute();
		} catch (error) {
			throw new DataBaseError(
				"An error occurred when trying to delete a book in the database.",
				error.message,
				"BookRepository"
			);
		}
	}

	async checkIfBookExistsByTitle(bookTitle: string) {
		try {
			const possibleBooks = await this.repository.findOne({ where: { title: bookTitle } });
			return !!possibleBooks;
		} catch (error) {
			throw new DataBaseError(
				"An error occurred when trying to verify the existence of a book by title",
				error.message,
				"BookRepository"
			);
		}
	}

	async checkIfBookExistsById(bookId: number) {
		try {
			const possibleBooks = await this.repository.findOne(bookId);
			return !!possibleBooks;
		} catch (error) {
			throw new DataBaseError(
				"An error occurred when trying to verify the existence of a book by id",
				error.message,
				"BookRepository"
			);
		}
	}
}
