import { cleanEnv, str } from "envalid";

function validateEnv() {
    cleanEnv(import.meta.env, {
        VITE_DEV_BACKEND_URL: str(),

        VITE_POSTS_FILE_NAME: str(),
        VITE_POSTS_FOLDER: str(),
        VITE_GOOGLE_BUCKET_URL: str(),
    });
}
export default validateEnv;
