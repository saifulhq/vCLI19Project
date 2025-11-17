import { Dimensions } from "react-native";
import { objectToArray } from "./Extractor";

const { width, height } = Dimensions.get("window");

const dynamic = {
    // dimention
    wFull: { width },
    hFull: { height },

    // position
    absolute: { position: 'absolute' },
    relative: { position: 'relative' },

    // separator horizontal
    separator: {
        height: .4,
        backgroundColor: '#ccc',
    },
};

const opacitiesSize = objectToArray({ op25: .25, op50: .5, op75: .75 });
opacitiesSize.prop.forEach((prop, i) => {
    dynamic[`${prop}`] = { opacity: opacitiesSize.value[i] };
})

const widthSize = objectToArray({ w25: '25%', w50: '50%', w75: '75%', w100: '100%' });
widthSize.prop.forEach((prop, i) => {
    dynamic[`${prop}`] = { width: widthSize.value[i] };
})

export default dynamic;