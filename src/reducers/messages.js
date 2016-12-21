import { SEND_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE} from '../constants/ActionTypes'

export default function messages(state = [], action) {
    switch (action.type) {
        case SEND_MESSAGE:
            return [
                ...state,
                {
                    id: action.id,
                    user_id: action.user_id,
                    text: action.text,
                    message_type: action.message_type
                }
            ]

        case DELETE_MESSAGE:
            return state.filter(message =>
                message.id !== action.id
            )

        case EDIT_MESSAGE:
            return state.map(message =>
                message.id === action.id ?
                { ...message, text: action.text } :
                message
            )

        default:
            return state
    }
}
