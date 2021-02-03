import * as actionTypes from './constants'
import produce from 'immer'

const defaultState = {
  currentAlbum: {},
  enterLoading: false
}

export default produce((draftState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      draftState.currentAlbum = action.data
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      draftState.enterLoading = action.data
      break
    default:
      return draftState
  }
})