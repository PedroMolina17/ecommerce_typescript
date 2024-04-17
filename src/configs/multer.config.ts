import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: "public/images/temp",
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
export const upload = multer({ storage });
