import { cleanEnv, str } from "envalid";

function validateEnv() {
    cleanEnv(import.meta.env, {
        VITE_DEV_API_ENDPOINT: str(),
        VITE_IMAGE_PATH: str(),
    });
}
export default validateEnv;
