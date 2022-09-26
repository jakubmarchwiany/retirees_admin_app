/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable prefer-const */

export function dataURLtoFile(dataUrl: string, filename: string) {
    let arr = dataUrl.split(","),
        mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}
