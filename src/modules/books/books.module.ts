import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ImgurService from "src/helpers/APIs/imgurApi";
import BooksController from "./books.controller";
import BookRepository from "./books.repository";
import BooksService from "./books.service";

@Module({
	imports: [TypeOrmModule.forFeature([BookRepository])],
	controllers: [BooksController],
	providers: [BooksService, ImgurService],
})
export default class BooksModule {}
