import { IsArray, IsString } from "class-validator";

export default class BodyCreateBookDto {
	@IsString()
	title: string;

	@IsString()
	publishingCompany: string;

	@IsArray()
	authors: string[];
}
