import {Router} from "express";
import {createBrand,deleteBrand,updateBrand} from "../controllers/admin/brand.ctrl";
import { getBrands } from "../controllers/brand.ctrl";
const router = Router()
router.get('/brands', getBrands)
router.post('/create-brand', createBrand)
router.put('/update-brand', updateBrand)
router.delete('/delete-brand', deleteBrand)
export default router