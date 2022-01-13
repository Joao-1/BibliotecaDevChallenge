/* eslint-disable no-unused-vars */
export default interface IUploadImageService {
	uploadImage(imagePath: string): Promise<string>;
}
