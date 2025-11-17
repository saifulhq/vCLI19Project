import { StyleSheet } from 'react-native';
import { style } from './config/data.json';
import MarginStyles from './styles/MarginStyle';
import PaddingStyle from './styles/PaddingStyle';
import FlexStyle from './styles/FlexStyle';
import TextStyle from './styles/TextStyle';
import BorderStyle from './styles/BorderStyle';
import CardStyle from './styles/CardStyle';
import FormStyle from './styles/FormStyle';
import ThemeStyle from './styles/ThemeStyle';
import ButtonStyle from './styles/ButtonStyle';
import ColorStyle from './styles/ColorStyle';
import OtherStyle from './styles/OtherStyle';

const styleObj = {
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'top',
        backgroundColor: style.bgLayout,
        color: style.primaryColor
    }
}

const resultObj = {
    ...styleObj,
    ...MarginStyles,
    ...PaddingStyle,
    ...FlexStyle,
    ...TextStyle,
    ...BorderStyle,
    ...CardStyle,
    ...FormStyle,
    ...ThemeStyle,
    ...ButtonStyle,
    ...ColorStyle,
    ...OtherStyle
}
// console.log({ resultObj })

export default StyleSheet.create(resultObj);