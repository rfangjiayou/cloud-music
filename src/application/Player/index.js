import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from './store/actionCreators'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'

function Player(props) {
  const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }

  const fullScreen = useSelector(state => state.player.fullScreen)
  const playing = useSelector(state => state.player.playing)
  // const currentSong = useSelector(state => state.player.currentSong)
  const showPlayList = useSelector(state => state.player.showPlayList)
  const mode = useSelector(state => state.player.mode)
  const currentIndex = useSelector(state => state.player.currentIndex)
  const playList = useSelector(state => state.player.playList)
  const sequencePlayList = useSelector(state => state.player.sequencePlayList)

  const dispatch = useDispatch()

  const togglePlayingDispatch = (data) => {
    dispatch(changePlayingState(data))
  }
  const toggleFullScreenDispatch = (data) => {
    dispatch(changeFullScreen(data))
  }
  const togglePlayListDispatch = (data) => {
    dispatch(changeShowPlayList(data))
  }
  const changeCurrentIndexDispatch = (index) => {
    dispatch(changeCurrentIndex(index))
  }
  const changeCurrentDispatch = (data) => {
    dispatch(changeCurrentSong(data))
  }
  const changeModeDispatch = (data) => {
    dispatch(changePlayMode(data))
  }
  const changePlayListDispatch = (data) => {
    dispatch(changePlayList(data))
  }

  return (
    <div>
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      />
      <NormalPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      />
    </div>
  )
}

export default React.memo(Player)