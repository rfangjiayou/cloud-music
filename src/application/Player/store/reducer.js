import * as actionTypes from './constants'
import produce from 'immer'
import { playMode } from '../constant'

const defaultState = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: playMode.sequence, // 播放模式
  currentIndex: 0, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {}
}

export default produce((draftState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      draftState.currentSong = action.data
      break
    case actionTypes.SET_FULL_SCREEN:
      draftState.fullScreen = action.data
      break
    case actionTypes.SET_PLAYING_STATE:
      draftState.playing = action.data
      break
    case actionTypes.SET_SEQUECE_PLAYLIST:
      draftState.sequencePlayList = action.data
      break
    case actionTypes.SET_PLAYLIST:
      draftState.playList = action.data
      break
    case actionTypes.SET_PLAY_MODE:
      draftState.mode = action.data
      break
    case actionTypes.SET_CURRENT_INDEX:
      draftState.currentIndex = action.data
      break
    case actionTypes.SET_SHOW_PLAYLIST:
      draftState.showPlayList = action.data
      break
    default:
      return draftState
  }
})