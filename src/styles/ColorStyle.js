import { colors } from '../config/data.json'
import { capitalizeFirstLetter, objectToArray } from './Extractor';

const dynamic = {
}

const extractColor = objectToArray({
    success: colors.success,
    danger: colors.danger,
    dark: colors.dark,
    info: colors.info,
    light: colors.light,
    primary: colors.primary,
    secondary: colors.secondary,
    warning: colors.warning,
    white: "#FFF",
    black: "#000",
    softLight: '#F6F6F6'
});
extractColor.prop.forEach((prop, i) => {
    dynamic[`${prop}`] = { color: extractColor.value[i] };
    dynamic[`bg${capitalizeFirstLetter(prop)}`] = { backgroundColor: extractColor.value[i] };
})

export default dynamic;