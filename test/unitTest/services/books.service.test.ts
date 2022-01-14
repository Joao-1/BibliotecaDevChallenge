/* eslint-disable no-empty-function */
/* eslint-disable no-undef */
import { Test, TestingModule } from "@nestjs/testing";
import { DeleteResult } from "typeorm";
import ImgurService from "../../../src/helpers/APIs/imgurApi";
import BookRepository from "../../../src/modules/books/books.repository";
import BooksService from "../../../src/modules/books/books.service";
import TestHelper from "../../testHelpers/TestHelper";

describe("BooksService", () => {
	let service: BooksService;
	let repository: BookRepository;

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
						insertNewBook: jest.fn().mockReturnValue([userFuc(1)]),
						checkIfBookExistsByTitle: jest.fn(),
						checkIfBookExistsById: jest.fn(),
						updateABook: jest.fn().mockReturnValue(userFuc(1)),
						deleteABook: jest.fn().mockReturnValue(new DeleteResult()),
					};
				}
				if (token === ImgurService) {
					return {
						uploadImage: jest.fn().mockReturnValue("http://image.com"),
					};
				}
			})
			.compile();

		service = module.get<BooksService>(BooksService);
		repository = module.get<BookRepository>(BookRepository);
	});

	describe("getBooks", () => {
		it("should return all books", async () => {
			const returnedBooks = await service.getBooks();
			expect(returnedBooks).toHaveLength(3);
		});
	});

	describe("registerBook", () => {
		it("should return a new book", async () => {
			jest.spyOn(repository, "checkIfBookExistsByTitle").mockReturnValue(Promise.resolve(false));
			const newBook = await service.registerBook(
				{ title: "title", authors: ["authors"], publishingCompany: "company" },
				"imagepath"
			);
			expect(newBook).toHaveLength(1);
		});

		it("this should return an error when trying to insert a new book with already existing title", async () => {
			jest.spyOn(repository, "checkIfBookExistsByTitle").mockReturnValue(Promise.resolve(true));
			try {
				await service.registerBook(
					{ title: "BookTitle", authors: ["authors"], publishingCompany: "company" },
					"imagepath"
				);
			} catch (error) {
				expect(error.response.statusCode).toBe(422);
				expect(error.response.message).toBe("There is already a book with BookTitle title");
			}
		});
	});

	describe("updateBooks", () => {
		it("should return a book with the same id (test without image path)", async () => {
			jest.spyOn(repository, "checkIfBookExistsById").mockReturnValue(Promise.resolve(true));
			const updatedBook = await service.updateBooks(1, {});

			expect(updatedBook).toHaveProperty("id");
			expect(updatedBook.id).toBe(1);
		});

		it("should return a book with the same id (test with image path)", async () => {
			jest.spyOn(repository, "checkIfBookExistsById").mockReturnValue(Promise.resolve(true));
			const updatedBook = await service.updateBooks(1, {}, "imagePath");

			expect(updatedBook).toHaveProperty("id");
			expect(updatedBook.id).toBe(1);
		});

		it("should return an error when trying to update a book with an id that doesn't exist", async () => {
			try {
				jest.spyOn(repository, "checkIfBookExistsById").mockReturnValue(Promise.resolve(false));
				await service.updateBooks(2, {});
			} catch (error) {
				expect(error.response.statusCode).toBe(422);
				expect(error.response.message).toBe("There is no book id 2 registered in the database");
			}
		});
	});

	describe("removeBook", () => {
		it("should return success when deleting a book", async () => {
			jest.spyOn(repository, "checkIfBookExistsById").mockReturnValue(Promise.resolve(true));
			const deleteResult = await service.removeBook(1);

			expect(deleteResult).toEqual({});
		});

		it("should return an error when trying to delete a book that doesn't exist", async () => {
			try {
				jest.spyOn(repository, "checkIfBookExistsById").mockReturnValue(Promise.resolve(false));
				await service.removeBook(1);
			} catch (error) {
				expect(error.response.statusCode).toBe(422);
				expect(error.response.message).toBe("There is no book id 1 registered in the database");
			}
		});
	});
});
