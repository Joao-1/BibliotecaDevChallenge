/* eslint-disable no-empty-function */
/* eslint-disable no-undef */
import { Test, TestingModule } from "@nestjs/testing";
import BookRepository from "../../src/modules/books/books.repository";
import BooksService from "../../src/modules/books/books.service";
import TestHelper from "../helpers/TestHelper";

describe("BooksService", () => {
	let service: BooksService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BooksService],
		})
			// eslint-disable-next-line consistent-return
			.useMocker((token) => {
				if (token === BookRepository) {
					const userFuc = TestHelper.giveMeAValidBook;

					return {
						getAllBooks: jest.fn().mockReturnValue([userFuc(1), userFuc(2), userFuc(3)]),
						// insertNewBook: jest.fn().mockReturnValue(),
						// checkIfBookExistsByTitle: jest.fn().mockImplementation(() => console.log(this)),
					};
				}
			})
			.compile();

		service = module.get<BooksService>(BooksService);
	});

	describe("getBooks", () => {
		it("should return all books", async () => {
			const returnedBooks = await service.getBooks();
			expect(returnedBooks).toHaveLength(3);
		});
	});

	// describe("registerBook", () => {
	// 	it("should return a new book", async () => {
	// 		const newBook = await service.registerBook(
	// 			{ title: "title 1", authors: ["authors 1"], publishingCompany: "company 1" },
	// 			"imagepath"
	// 		);
	// 		console.log(newBook);
	// 		expect(newBook).toHaveLength(1);
	// 	});
	// });
});
