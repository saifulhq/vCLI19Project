/**
 * 
 * @param {*} array 
 * @param {*} key 
 * @returns sample {
 *  Indonesia : [{}, {}],
 *  Chinese : [{}, {}],
 *  Japanise : [{}, {}],
 *  Holiwod : [{}, {}],
 * }
 */
export const ArrayGroupBy = (array, key) => {
    return array.reduce((accumulator, currentItem) => {
        const fieldValue = currentItem[key];
        // Jika kunci belum ada di accumulator, inisialisasi dengan array kosong
        if (!accumulator[fieldValue]) {
            accumulator[fieldValue] = [];
        }
        // Tambahkan item saat ini ke array yang sesuai
        accumulator[fieldValue].push(currentItem);
        return accumulator; // Kembalikan accumulator untuk iterasi berikutnya
    }, {}); // Nilai awal accumulator adalah objek kosong {}
};

/**
 * Mengambil nilai unik dari field tertentu dalam array objek.
 * 
 * @param {Array<Object>} array - Array data sumber.
 * @param {string} fieldName - Nama kunci (key/field) yang akan diekstrak nilainya.
 * @returns {Array<any>} Array berisi nilai unik tanpa duplikasi.
 */
export function ArrayUniqueValuesBy(array, fieldName) {
    // Gunakan map untuk mengekstrak semua nilai field
    const allValues = array.map(item => item[fieldName]);

    // Gunakan Set dan Array.from (atau spread syntax) untuk menghilangkan duplikasi
    const uniqueValues = [...new Set(allValues)];

    return uniqueValues;
}