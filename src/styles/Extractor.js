export function objectToArray(obj) {
    const props = Object.keys(obj);
    const values = Object.values(obj);

    return {
        prop: props,
        value: values
    };
}

export function capitalizeFirstLetter(string) {
    if (!string) return string; // Cek jika string kosong

    // charAt(0) mengambil huruf pertama
    // toUpperCase() mengubahnya menjadi kapital
    // slice(1) mengambil sisa string dari indeks 1 sampai akhir
    return string.charAt(0).toUpperCase() + string.slice(1);
}