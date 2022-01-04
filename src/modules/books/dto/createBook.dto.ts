import { IsArray, IsString } from "class-validator";

export class CreateBookDto {
	@IsString()
	title: string;

	@IsString()
	publishingCompany: string;

	@IsArray()
	authors: string[];
}
