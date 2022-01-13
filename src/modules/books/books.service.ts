import { Injectable } from "@nestjs/common";
import ImgurService from "../../../src/helpers/APIs/imgurApi";
import {
	DeleteBookError,
	RegisterBookError,
	UpdateBookError,
} from "../../helpers/nestHelpers/exceptions/errorsExceptions";
import BookRepository from "./books.repository";
import BodyCreateBookDto from "./dto/createBook.dto";
import { PutBookDtoBody } from "./dto/putBook.dto";
import IBook from "./interfaces/book.interface";

require("dotenv").config();

@Injectable()
export default class BooksService {
	// eslint-disable-next-line no-unused-vars
	constructor(private BooksRepository: BookRepository, private uploadImageService: ImgurService) {}

	async registerBook(bookWithoutImage: BodyCreateBookDto, imagePath: string) {
		if (await this.BooksRepository.checkIfBookExistsByTitle(bookWithoutImage.title)) {
			throw new RegisterBookError.BookAlreadyExists(bookWithoutImage.title);
		}

		const imgUrl = await this.uploadImageService.uploadImage(imagePath);
		const book = bookWithoutImage as unknown as IBook;
		book.imageURL = imgUrl;

		return this.BooksRepository.insertNewBook(book);
	}

	async getBooks() {
		return this.BooksRepository.getAllBooks();
	}

	async updateBooks(bookId: number, body: PutBookDtoBody, imagePath?: string) {
		if (!(await this.BooksRepository.checkIfBookExistsById(bookId))) {
			throw new UpdateBookError.BookWithThisIdDoesNotExists(bookId);
		}
		const newImageURL = imagePath ? await this.uploadImageService.uploadImage(imagePath) : null;
		const newValues = body as unknown as IBook;
		if (newImageURL) newValues.imageURL = newImageURL;
		return this.BooksRepository.updateABook(bookId, newValues);
	}

	async removeBook(bookId: number) {
		if (!(await this.BooksRepository.checkIfBookExistsById(bookId))) {
			throw new DeleteBookError.BookWithThisIdDoesNotExists(bookId);
		}
		return this.BooksRepository.deleteABook(bookId);
	}
}
