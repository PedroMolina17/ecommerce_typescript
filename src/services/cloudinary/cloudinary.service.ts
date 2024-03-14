import cloudinary from "../../configs/cloudinary.config";
import ClientError from "../../errors/clientError.error";
import fs from "fs-extra";
export class CloudinaryService {
  static async uploadImg(path: string, publicId?: string) {
    if (!path) throw new ClientError("path is required", 400);

    const result = await cloudinary.uploader.upload(
      path,
      {
        public_id: publicId && publicId,
      },
      function (error, result) {
        console.log(result);
      }
    );

    return result;
  }

  static async uploadProfilePicture(
    pathToFile: string,
    publicId?: string | null
  ) {}
}
