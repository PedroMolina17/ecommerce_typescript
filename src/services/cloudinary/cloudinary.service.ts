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

  static async uploadProfilePicture(pathToFile: string, publicId?: string) {
    const options = publicId
      ? { public_id: publicId }
      : { folder: "profile-picture" };
    try {
      const result = await cloudinary.uploader.upload(pathToFile, {
        ...options,
      });
      fs.unlink(pathToFile);
      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.log(error);
      fs.unlink(pathToFile);
      throw error
    }
  }
}
