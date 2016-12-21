import { SET_USER_ID } from '../constants/ActionTypes'

export default function messages(state = {}, action) {
    switch (action.type) {
        case SET_USER_ID:
            return {
                id: action.id,
                name: action.name
            }
        default:
            return state
    }
}
