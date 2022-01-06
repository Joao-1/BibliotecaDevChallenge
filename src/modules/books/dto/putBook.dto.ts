/* eslint-disable max-classes-per-file */
import { IsArray, IsNumberString, IsOptional, IsString } from "class-validator";

export class PutBookDtoParam {
	@IsNumberString()
	id: number;
}

export class PutBookDtoBody {
	@IsOptional()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	publishingCompany: string;

	@IsOptional()
	@IsArray()
	authors: string[];

	@IsOptional()
	image: string;
}
