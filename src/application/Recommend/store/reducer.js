import * as actionTypes from './constants'
import produce from 'immer'

const defaultState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
}

export default produce((draftState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      draftState.bannerList = [...draftState.bannerList, ...action.data]
      break
    case actionTypes.CHANGE_RECOMMEND_LIST:
      draftState.recommendList = [...draftState.recommendList, ...action.data]
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      draftState.enterLoading = action.data
      break
    default:
      return draftState
  }
})