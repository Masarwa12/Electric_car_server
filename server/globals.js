import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';
//שרשור ברמת המחשב לקובץ בו אני נמצא עכשיו
export const __filename = fileURLToPath(import.meta.url);

// שרשור ברמת המחשב לתיקייה בה אני נמצא עכשיו
export const __dirname = path.dirname(__filename);

export const SECRET = '3b0c02b4-cf20-4cee-8091-63cabd3afa9a';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,`${file.originalname}`);
    },
});

export const upload = multer({ storage });
export const ROLES = { USER: 'user', ADMIN: 'admin' };

