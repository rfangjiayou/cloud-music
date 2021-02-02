import * as actionTypes from './constants'
import produce from 'immer'

const defaultState = {
  rankList: [],
  loading: true
}

export default produce((draftState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_RANK_LIST:
      draftState.rankList = action.data
      break
    case actionTypes.CHANGE_LOADING:
      draftState.loading = action.data
      break
    default:
      return draftState
  }
})