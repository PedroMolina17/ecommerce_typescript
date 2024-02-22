import {Router} from "express";
import {createBrand,deleteBrand,updateBrand} from "../controllers/admin/brand.ctrl";
const router = Router()
router.post('/create-brand', createBrand)
router.put('/update-brand', updateBrand)
router.delete('/delete-brand', deleteBrand)
export default router