import multer from 'multer';
import * as fs from 'fs';



const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
      console.log(file.originalname);
      const dir = './public/static/assets/uploads';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });


  export default function uploader(): multer.Multer{
    return multer({ storage: storage, dest: 'uploads/' })
  }
