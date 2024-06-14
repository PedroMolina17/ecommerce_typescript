import { payment } from "../configs/mercadoPago.config";
import { fnCtrl } from "../types/types";
import registrationError from "../utils/registrationError.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { sendResponse } from "../utils/sendResponse.util";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const paymentCtrl: fnCtrl = async (req, res, next) => {
    const { id } = req.params;
    const { paymentMethodId } = req.body;
    
}