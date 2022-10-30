/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;

    readonly VITE_POSTS_FILE_NAME: string;
    readonly VITE_POSTS_FOLDER: string;
    readonly VITE_GOOGLE_BUCKET_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
