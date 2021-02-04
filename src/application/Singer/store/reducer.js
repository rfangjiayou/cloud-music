import * as actionTypes from './constants'
import produce from 'immer'

const defaultState = {
  artist: {},
  songsOfArtist: [],
  loading: true
}

export default produce((draftState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ARTIST:
      draftState.artist = action.data
      break
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      draftState.songsOfArtist = action.data
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      draftState.loading = action.data
      break
    default:
      return draftState
  }
})