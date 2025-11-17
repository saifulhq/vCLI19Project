import { server_url, server_url_dev } from '../../app.json';

export const copyProperties = (src, dest) => {
    let keys = Object.keys(src);
    keys.forEach(x => {
        if (dest.hasOwnProperty(x)) {
            dest[x] = src[x];
        }
    });
}

export const mergeSelective = (dest, src) => {
    const newObject = { ...dest }; // Mulai dengan salinan objek tujuan (destinasi)

    const keys = Object.keys(src);
    keys.forEach(x => {
        // Cek 1: Pastikan kunci sudah ada di destinasi awal
        if (newObject.hasOwnProperty(x)) {
            // Cek 2: Pastikan nilai sumber BUKAN undefined
            if (src[x] !== undefined) {
                newObject[x] = src[x];
            }
        }
    });

    return newObject; // Mengembalikan objek baru yang sudah diperbarui
};

export const getServerUrl = () => {
    return __DEV__ ? server_url_dev : server_url;
}