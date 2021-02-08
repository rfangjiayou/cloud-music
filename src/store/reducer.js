import { combineReducers } from 'redux'
import { reducer as recommendReducer } from '@/application/Recommend/store'
import { reducer as singersReducer } from '@/application/Singers/store'
import { reducer as rankReducer } from '@/application/Rank/store'
import { reducer as albumReducer } from '@/application/Album/store'
import { reducer as singerInfoReducer } from '@/application/Singer/store'
import { reducer as playerReducer } from '@/application/Player/store'

export default combineReducers({
  // 之后开发具体功能模块的时候添加 reducer
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playerReducer
})