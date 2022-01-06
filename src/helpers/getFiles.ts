import { FileInterceptor } from "@nestjs/platform-express";
import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname } from "path";

export default (fileName: string) =>
	FileInterceptor(fileName, {
		storage: diskStorage({
			filename: (req, file, cb) => {
				const filename: string = file.originalname.replace(/\s/g, "") + randomUUID();
				const extension: string = extname(file.originalname);
				cb(null, `${filename}${extension}`);
			},
		}),
	});
