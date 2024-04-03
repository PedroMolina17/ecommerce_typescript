import cloudinary from "../../configs/cloudinary.config";
import ClientError from "../../errors/clientError.error";
import fs from "fs-extra";
export class CloudinaryService {

  constructor() {}
  
   async uploadImgProduct(path: string, publicId?: string) {
    const options = publicId
      ? { public_id: publicId }
      : { folder: "products" };
    try {
      const result = await cloudinary.uploader.upload(path, {
        ...options,
      });
      fs.unlink(path);
      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.log(error);
      fs.unlink(path);
      throw error
    }
  }

   async uploadImage(pathToFile: string, publicId?: string) {
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

  async deleteImg(publicId: string) {
    try {
      const result = await cloudinary.api.delete_resources([publicId]);
    } catch (error) {
      throw error
    }
  }
}
