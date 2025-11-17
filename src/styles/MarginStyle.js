import { objectToArray } from "./Extractor";

// Objek untuk menampung gaya dinamis
const dynamic = {};

const spacingSizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20];
spacingSizes.forEach(size => {
    dynamic[`m${size}`] = { margin: size };
    dynamic[`mt${size}`] = { marginTop: size };
    dynamic[`ml${size}`] = { marginLeft: size };
    dynamic[`mr${size}`] = { marginRight: size };
    dynamic[`mb${size}`] = { marginBottom: size };
    dynamic[`mx${size}`] = { marginLeft: size, marginRight: size };
    dynamic[`my${size}`] = { marginTop: size, marginBottom: size };
});

const extractSize = objectToArray({ Xl: 50, Xxl: 80, Xl3: 110, Xl4: 140 });
extractSize.prop.forEach((prop, i) => {
    dynamic[`mt${prop}`] = { marginTop: extractSize.value[i] };
    dynamic[`mb${prop}`] = { marginBottom: extractSize.value[i] };
})

export default dynamic;