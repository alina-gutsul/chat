import { ADD_USER, DELETE_USER, GET_USER_NAME } from '../constants/ActionTypes'

export default function messages(state = [], action) {
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name
                }
            ]

        case DELETE_USER:
            return state.filter(user =>
                user.id !== action.id
            )
        // 
        // case GET_USER_NAME:
        //     console.log("lalalalalal");
        //     return "llll" + action.id

        default:
            return state
    }
}
