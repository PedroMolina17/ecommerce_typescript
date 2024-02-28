import { Router } from "express";
import { createTechnicalDetailsProduct, getTechnicalDetailsProduct } from "../controllers/admin/technicalDetailsProduct.ctrl";
const router = Router()
router.get("/",getTechnicalDetailsProduct )
router.post("/create-technical-detail-product",createTechnicalDetailsProduct )
router.get("/",getTechnicalDetailsProduct )
export default router