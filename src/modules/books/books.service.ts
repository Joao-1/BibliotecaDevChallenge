import { Injectable } from "@nestjs/common";
import axios from "axios";
import { readFile } from "fs";
import { promisify } from "util";
import { RegisterBookError, ServicesProvidersError } from "../../helpers/nestHelpers/exceptions/errorsExceptions";
import BookRepository from "./books.repository";
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

	async registerBook(book: IBook) {
		if (await this.BooksRepository.checkIfBookAlreadyExists(book.title)) {
			throw new RegisterBookError.BookAlreadyExists(book.title);
		}

		return this.BooksRepository.create(book);
	}
}
