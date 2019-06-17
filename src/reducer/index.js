import {API_REQUEST, API_REQUEST_SUCCESS, API_REQUEST_FAILURE} from '../actions'

const initialState = {
    fetching : false,
    info : null,
    error : null,
    num:0
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case API_REQUEST:
            
            return {...state, fetching:true, error:null, number:action.num}
        case API_REQUEST_SUCCESS:
            return {...state, fetching:false, info:action.info}
        case API_REQUEST_FAILURE:
            return {...state, fetching:false, info:null, error:action.error}    
    
        default:
            return state
    }
}