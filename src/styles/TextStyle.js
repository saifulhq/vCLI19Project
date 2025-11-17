// import { media } from '../config/data.json';

import { objectToArray } from "./Extractor";

// Objek untuk menampung gaya dinamis
const dynamic = {

    // font style
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },

    // align
    textCenter: { textAlign: 'center' }
};

const headingSizes = [24, 20, 16, 12];
headingSizes.forEach((size, i) => {
    dynamic[`h${i + 1}`] = { fontSize: size, fontWeight: 600 };
});

const weightSizes = [2, 3, 4, 5, 6, 7, 8];
weightSizes.forEach((size) => {
    dynamic[`fw${size}`] = { fontWeight: size * 100 };
});

const fontSizes = [10, 11, 12, 13, 14, 15, 16, 17, 18];
fontSizes.forEach((size) => {
    dynamic[`fs${size}`] = { fontSize: size };
});

const extractSize = objectToArray({ Xs: 10, Sm: 12, Md: 16, Lg: 18, Xl: 20, Xxl: 22, Xl3: 32, Xl4: 42 });
extractSize.prop.forEach((prop, i) => {
    dynamic[`text${prop}`] = { fontSize: extractSize.value[i] };
})

export default dynamic;