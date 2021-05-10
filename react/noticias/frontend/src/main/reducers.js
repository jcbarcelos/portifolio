import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import PostReducer from '../components/post/postReducers'
import TabReducer from '../common/tab/tabReducer'
const rootDeducer = combineReducers({
    postReducer: PostReducer,
    tab: TabReducer,
    form: formReducer,
    toastr: toastrReducer
})
export default rootDeducer