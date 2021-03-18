const SHOWE_LOADER = 'SHOWE_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

const defaultState = {
    isLoader: false,
}


export default function appUtils(state = defaultState, action) {
    switch (action.type) {
        case SHOWE_LOADER :return {...state  , isLoader:true}
        case HIDE_LOADER :return {...state  , isLoader:false}

        default:
            return state
    }
}

export const showeLoader=()=>({type:SHOWE_LOADER})
export const hideLoader=()=>({type:HIDE_LOADER})











