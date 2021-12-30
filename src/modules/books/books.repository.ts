import { AbstractRepository, EntityRepository } from "typeorm";
import { Book } from "./books.entity";

@EntityRepository(Book)
export class BookRepository extends AbstractRepository<Book> {
	createAndSave(firstName: string, lastName: string) {
		this.repository.create();
	}

	async findByName(firstName: string, lastName: string) {
		const test = await this.repository.findOne();
		return test;
	}

	async checkIfBookAlreadyExists(bookTitle: string) {
		const possibleBooks = await this.repository.find({ where: { name: bookTitle } });
		return possibleBooks.some((book) => {
			return bookTitle === book.title;
		});
	}
}
