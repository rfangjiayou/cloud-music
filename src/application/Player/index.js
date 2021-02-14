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
import Toast from '@/baseUI/Toast'
import { getSongUrl, isEmptyObject, findIndex, shuffle } from '@/api/utils'
import { playMode } from './constant'

function Player(props) {
  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  // 歌曲总时长
  const [duration, setDuration] = useState(0)
  // 歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
  // 记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({})
  const [modeText, setModeText] = useState("")
  const songReady = useRef(true)

  // 绑定ref
  const audioRef = useRef()
  const toastRef = useRef()

  const fullScreen = useSelector(state => state.player.fullScreen)
  const playing = useSelector(state => state.player.playing)
  const currentSong = useSelector(state => state.player.currentSong)
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

  const clickPlaying = (e, state) => {
    e.stopPropagation()
    togglePlayingDispatch(state)
  }

  const updateTime = e => {
    setCurrentTime(e.target.currentTime)
  }

  const onProgressChange = curPercent => {
    const newTime = curPercent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    if (!playing) {
      togglePlayingDispatch(true)
    }
  }

  // 一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0
    changePlayingState(true)
    audioRef.current.play()
  }

  const handlePrev = () => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) index = playList.length - 1
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }

  const handleNext = () => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index === playList.length) index = 0
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    } else {
      handleNext()
    }
  }

  const changeMode = () => {
    let newMode = (mode + 1) % 3
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList)
      let index = findIndex(currentSong, sequencePlayList)
      changeCurrentIndexDispatch(index)
      setModeText("顺序循环")
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList)
      setModeText("单曲循环")
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList)
      let index = findIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
      setModeText("随机播放")
    }
    changeModeDispatch(newMode)
    toastRef.current.show()
  }

  const handleError = () => {
    songReady.current = true
    alert("播放出错")
  }

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current // 标志位为 false
    )
      return
    let current = playList[currentIndex]
    songReady.current = false // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
    changeCurrentDispatch(current) // 赋值currentSong
    setPreSong(current)
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(() => {
      // 注意，play 方法返回的是一个 promise 对象
      audioRef.current.play().then (() => {
        songReady.current = true
      })
    })
    togglePlayingDispatch(true) // 播放状态
    setCurrentTime(0) // 从头开始播放
    setDuration((current.dt / 1000) | 0) // 时长
  }, [playList, currentIndex])

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])

  return (
    <div>
      {
        isEmptyObject(currentSong) ? null : 
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          percent={percent}
        /> 
      }
      {
        isEmptyObject(currentSong) ? null : 
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          duration={duration} // 总时长
          currentTime={currentTime} // 播放时间
          percent={percent} // 进度
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
        />
      }
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      />
      <Toast text={modeText} ref={toastRef} />
    </div>
  )
}

export default React.memo(Player)