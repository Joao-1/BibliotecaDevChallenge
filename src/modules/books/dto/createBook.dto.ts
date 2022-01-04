import { IsArray, IsString } from "class-validator";

export default class CreateBookDto {
	@IsString()
	title: string;

	@IsString()
	publishingCompany: string;

	@IsArray()
	authors: string[];
}
