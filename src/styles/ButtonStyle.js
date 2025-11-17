import { colors } from './../config/data.json';
import BORDER from './BorderStyle'
import PADDING from './PaddingStyle'
import COLOR from './ColorStyle'

// Objek untuk menampung gaya dinamis
const dynamic = {
    btn: {
        ...BORDER.b1,
        ...BORDER.bPrimary,
        ...PADDING.p10,
        ...PADDING.px20,
        ...COLOR.primary
    },
    btnCircle: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        padding: 5
    },
    btnDark: {
        backgroundColor: colors.dark
    },
    btnLight: {
        backgroundColor: colors.light,
        borderWidth: 1,
        borderColor: colors.dark
    }
}

export default dynamic;