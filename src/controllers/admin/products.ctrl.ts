import { Response, Request, NextFunction } from "express";
import {
  ICreateProduct,
  IDataProduct,
  IDataProductUpdate,
  IProductDelete,
  IProductUpdate,
} from "../../types/product.type";
import { ProductService } from "../../services/admin/products.service";
import registrationError from "../../utils/registrationError.util";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import { CloudinaryService } from "../../services/cloudinary/cloudinary.service";
import { PrismaClient } from "@prisma/client";
import { processFiles } from "../../utils/processFIles.util";
import { parseProduct } from "../../utils/parseProduct.util";
import { NotificationsService } from "../../services/admin/notifications.service";

const prisma = new PrismaClient();
const cloudinaryService = new CloudinaryService();
const notificationService = new NotificationsService()
const productService = new ProductService(cloudinaryService, prisma, notificationService);

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productRequest = req.body;
    const productParse = parseProduct(productRequest);   
    const files = processFiles(req.files);
    const product = {
      product: { ...productParse },
      ...files,
    };

    const data = await productService.createProduct(product);
    console.log("productAndFiles--->", product);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product, idImageOlds } = req.body;
    const files = req.files as {
      image: Express.Multer.File[];
    };
    console.log("product-->>product-->",product)
    const productParse= parseProduct(JSON.parse(product));
    const pathImages: Omit<IDataProductUpdate, "product" | "idImageOlds"> =
      processFiles(files);
     
    const dataproduct = {
      product: productParse,
      idImageOlds: JSON.parse(idImageOlds).map((id: string) => Number(id)),
      image: pathImages.image,
    };
    const { productId } = req.params;
    const productIdNumber = Number(productId);
    console.log("productAndFiles--->", dataproduct);
    const data = await productService.updateProduct(
      dataproduct,
      productIdNumber,      
    );
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productId = Number(id);
    const data = await productService.deleteProduct(productId);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export { createProduct, updateProduct, deleteProduct };
