import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import BooksController from "./books.controller";
import BookRepository from "./books.repository";
import BooksService from "./books.service";

@Module({
	imports: [TypeOrmModule.forFeature([BookRepository])],
	controllers: [BooksController],
	providers: [BooksService],
})
export default class BooksModule {}
