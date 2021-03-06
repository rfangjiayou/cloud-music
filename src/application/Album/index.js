import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Container,
  TopDesc,
  Menu
} from './style'
import style from '@/assets/global-style'
import { CSSTransition } from 'react-transition-group'
import Header from '@/baseUI/Header'
import Scroll from '@/baseUI/Scroll'
import { isEmptyObject } from '@/api/utils'
import { useSelector, useDispatch } from 'react-redux'
import { 
  getAlbumList, 
  changeEnterLoading
} from './store/actionCreators'
import Loading from '@/baseUI/Loading'
import SongsList from '@/application/SongsList'
import MusicNote from '@/baseUI/MusicNote'

function Album(props) {
  const { songsCount } = props

  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const [isMarquee, setIsMarquee] = useState (false) // 是否跑马灯

  const headerEl = useRef()
  const musicNoteRef = useRef()

  const currentAlbum = useSelector(state => state.album.currentAlbum)
  const enterLoading = useSelector(state => state.album.enterLoading)

  const dispatch = useDispatch()

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const getAlbumDataDispatch = (id) => {
    dispatch(changeEnterLoading(true))
    dispatch(getAlbumList(id))
  }

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y })
  }

  const handleScroll = useCallback((pos) => {
    const minScrollY = -45
    const percent = Math.abs(pos.y / minScrollY)
    const headerDom = headerEl.current
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"]
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
      setTitle(currentAlbum.name)
      setIsMarquee(true)
    } else {
      headerDom.style.backgroundColor = ""
      headerDom.style.opacity = 1
      setTitle("歌单")
      setIsMarquee(false)
    }
  }, [currentAlbum])

  const id = props.match.params.id
  useEffect(() => {
    getAlbumDataDispatch(id)
  }, [id])

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter" />
        </div>
        <div className="img_wrapper">
          <div className="decorate" />
          <img src={currentAlbum.coverImgUrl} alt=""/>
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{Math.floor(currentAlbum.subscribedCount/1000)/10} 万 </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt=""/>
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    )
  }

  const renderSongList = () => {
    return (
      <SongsList 
        songs={currentAlbum.tracks}
        showCollect={true}
        collectCount={currentAlbum.subscribedCount}
        showBackground={true}
        musicAnimation={musicAnimation}
      />
    )
  }

  return (
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container play={songsCount}>
        <Header
          title={title}
          ref={headerEl}
          handleClick={handleBack}
          isMarquee={isMarquee}
        />
        {
          !isEmptyObject(currentAlbum) ?
            ( 
              <Scroll bounceTop={false} onScroll={handleScroll}>
                <div>
                  {renderTopDesc()}
                  {renderMenu()}
                  {renderSongList()}
                </div>  
              </Scroll>
            ) : null
        }
        <Loading show={enterLoading} />
        <MusicNote ref={musicNoteRef} />
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Album)