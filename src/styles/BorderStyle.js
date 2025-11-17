import { media, colors } from '../config/data.json';
import { objectToArray } from './Extractor';

// Objek untuk menampung gaya dinamis
const dynamic = {};

const borderSizes = [1, 2, 3];
borderSizes.forEach((size, i) => {
    dynamic[`b${i + 1}`] = { borderWidth: size };
    // dynamic[`bb${i + 1}`] = { borderWidth: size };
});

const roundedSizes = [5, 10, 20, 30, 50];
roundedSizes.forEach((size, i) => {
    dynamic[`rn${media[i]}`] = { borderRadius: size };
    dynamic[`rn${size}`] = { borderRadius: size };
    dynamic[`rnt${size}`] = { borderTopLeftRadius: size, borderTopRightRadius: size };
    dynamic[`rnb${size}`] = { borderBottomLeftRadius: size, borderBottomRightRadius: size };
});

const borderColors = objectToArray({
    Success: colors.success,
    Danger: colors.danger,
    Dark: colors.dark,
    Info: colors.info,
    Light: colors.light,
    Primary: colors.primary,
    Secondary: colors.secondary,
    Warning: colors.warning,
});
borderColors.prop.forEach((prop, i) => {
    dynamic[`b${prop}`] = { borderColor: borderColors.value[i] };
})

export default dynamic;