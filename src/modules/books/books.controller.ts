import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Res,
	UploadedFile,
	UseInterceptors,
	ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import fileInterceptorWithMulter from "src/helpers/getFiles";
import { RegisterBookError } from "src/helpers/nestHelpers/exceptions/errorsExceptions";
import BooksService from "./books.service";
import CreateBookDtoBody from "./dto/createBook.dto";
import DeleteBookDtoParam from "./dto/deleteBook.dto";
import { PutBookDtoBody, PutBookDtoParam } from "./dto/putBook.dto";

@Controller("books")
export default class BooksController {
	// eslint-disable-next-line no-unused-vars
	constructor(private booksService: BooksService) {}

	@Post()
	@UseInterceptors(fileInterceptorWithMulter("image"))
	async create(
		// eslint-disable-next-line no-undef
		@UploadedFile() file: Express.Multer.File,
		@Body(new ValidationPipe()) createBookDto: CreateBookDtoBody,
		@Res() res: Response
	) {
		if (!file) throw new RegisterBookError.BookImageNotProvided();
		const newBook = await this.booksService.registerBook(createBookDto, file.path);
		res.status(HttpStatus.CREATED).json({ success: "true", book: newBook });
	}

	@Get()
	async get(@Res() res: Response) {
		const books = await this.booksService.getBooks();
		res.status(HttpStatus.OK).json({ success: "true", books });
	}

	@Put(":id")
	@UseInterceptors(fileInterceptorWithMulter("image"))
	async update(
		// eslint-disable-next-line no-undef
		@UploadedFile() file: Express.Multer.File,
		@Param(new ValidationPipe()) { id }: PutBookDtoParam,
		@Body(new ValidationPipe()) putBookDtoBody: PutBookDtoBody,
		@Res() res: Response
	) {
		const bookUpdated = await this.booksService.updateBooks(id, putBookDtoBody, file?.path);
		res.status(HttpStatus.OK).json({ success: "true", bookUpdated });
	}

	@Delete(":id")
	async delete(@Param(new ValidationPipe()) { id }: DeleteBookDtoParam, @Res() res: Response) {
		await this.booksService.removeBook(id);
		res.status(HttpStatus.OK).json({ success: "true" });
	}
}
