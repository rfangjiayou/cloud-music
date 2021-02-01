import * as actionTypes from './constants'
import produce from 'immer'

const defaultState = {
  singerList: [],
  enterLoading: true,     // 控制进场Loading
  pullUpLoading: false,   // 控制上拉加载动画
  pullDownLoading: false, // 控制下拉加载动画
  pageCount: 0            // 这里是当前页数
}

export default produce((draftState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      draftState.singerList = action.data
      break
    case actionTypes.CHANGE_PAGE_COUNT:
      draftState.pageCount = action.data
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      draftState.enterLoading = action.data
      break
    case actionTypes.CHANGE_PULLUP_LOADING:
      draftState.pullUpLoading = action.data
      break
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      draftState.pullDownLoading = action.data
      break
    default:
      return draftState
  }
})