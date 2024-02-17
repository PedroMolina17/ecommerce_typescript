import { Router } from "express";
import fs from "fs"
const router= Router();
const pathRouter = __dirname;
const removeExtension = (filename: string) => {
    return filename.split(".").shift();
}
fs.readdirSync(pathRouter).filter(filename => {
    const name = removeExtension(filename);
    if(name !== "index"){
        import(`./${filename}`).then((module )=> {
            router.use(`/${name}`, module.default);
        })
    }
})

export default router