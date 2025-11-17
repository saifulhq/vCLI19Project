// Objek untuk menampung gaya dinamis
const dynamic = {
    flex1: {
        flex: 1
    },
    alignCenter: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    between: {
        justifyContent: 'space-between'
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowBetweenCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default dynamic;