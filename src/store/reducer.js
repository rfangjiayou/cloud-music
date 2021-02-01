import { combineReducers } from 'redux'
import { reducer as recommendReducer } from '@/application/Recommend/store'
import { reducer as singersReducer } from '../application/Singers/store/index'

export default combineReducers({
  // 之后开发具体功能模块的时候添加 reducer
  recommend: recommendReducer,
  singers: singersReducer
})