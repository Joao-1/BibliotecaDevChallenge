import { Injectable } from "@nestjs/common";
import axios from "axios";
import { readFile } from "fs";
import { promisify } from "util";
import {
	DeleteBookError,
	RegisterBookError,
	ServicesProvidersError,
} from "../../helpers/nestHelpers/exceptions/errorsExceptions";
import BookRepository from "./books.repository";
import BodyCreateBookDto from "./dto/createBook.dto";
import { PutBookDtoBody } from "./dto/putBook.dto";
import IBook from "./interfaces/book.interface";

require("dotenv").config();

@Injectable()
export default class BooksService {
	// eslint-disable-next-line no-unused-vars
	constructor(private BooksRepository: BookRepository) {}

	async uploadImage(imagePath: string) {
		try {
			const { data } = (await axios.post(
				"https://api.imgur.com/3/image",
				{
					image: await promisify(readFile)(imagePath, { encoding: "base64" }),
				},
				{
					headers: {
						Authorization: `Client-ID ${process.env.CLIENT_ID}`,
					},
				}
			)) as { data: { data: { link: string } } };
			return data.data.link;
		} catch (error) {
			throw new ServicesProvidersError.ImgurError(error.response.data.data, "bookService");
		}
	}

	async registerBook(bookWithoutImage: BodyCreateBookDto, imagePath: string) {
		if (await this.BooksRepository.checkIfBookExistsByTitle(bookWithoutImage.title)) {
			throw new RegisterBookError.BookAlreadyExists(bookWithoutImage.title);
		}

		const imgUrl = await this.uploadImage(imagePath);
		const book = bookWithoutImage as unknown as IBook;
		book.imageURL = imgUrl;

		return this.BooksRepository.insertNewBook(book);
	}

	async getBooks() {
		return this.BooksRepository.getAllBooks();
	}

	async updateBooks(bookId: number, body: PutBookDtoBody, imagePath: string) {
		const newImageURL = imagePath ? await this.uploadImage(imagePath) : null;
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
