import Book from "../../src/modules/books/books.entity";

export default class TestHelper {
	static giveMeAValidBook(id: number): Book {
		const book = new Book();
		book.id = id;
		book.title = "validTitle";
		book.authors = "validAuthor";
		book.imageURL = "validImageURL";
		book.publishingCompany = "validPublishingCompany";
		return book;
	}
}
