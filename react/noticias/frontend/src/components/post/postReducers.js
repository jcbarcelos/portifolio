const INITIAL_STATE = { noticias: [] }
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'NOTICIAS_GET':
            return { ...state, noticias: action.payload?.data }
        default:
            return state;
    }
}