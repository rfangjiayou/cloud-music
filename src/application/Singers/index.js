import React, { useState, useEffect } from 'react'
import Horizen from '@/baseUI/HorizenItem'
import { categoryTypes, alphaTypes } from './constant'
import {
  NavContainer,
  List,
  ListItem,
  ListContainer
} from './style'
import Scroll from '@/baseUI/Scroll'
import { useSelector, useDispatch } from 'react-redux'
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators'
import Loading from '@/baseUI/Loading'
import LazyLoad, {forceCheck} from 'react-lazyload'

function Singers(props) {
  const [category, setCategory] = useState({})
  const [alpha, setAlpha] = useState('')

  const singerList = useSelector(state => state.singers.singerList)
  const enterLoading = useSelector(state => state.singers.enterLoading)
  const pullUpLoading = useSelector(state => state.singers.pullUpLoading)
  const pullDownLoading = useSelector(state => state.singers.pullDownLoading)
  const pageCount = useSelector(state => state.singers.pageCount)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!singerList.length) {
      getHotSingerDispatch()
    }
  }, [])

  const getHotSingerDispatch = () => {
    dispatch(getHotSingerList())
  }
  const updateDispatch = (category, alpha) => {
    dispatch(changePageCount(0))  // 由于改变了分类，所以pageCount清零
    dispatch(changeEnterLoading(true))  // loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
    dispatch(getSingerList(category, alpha))
  }
  // 滑到最底部刷新部分的处理
  const pullUpRefreshDispatch = (category, alpha, hot, count) => {
    dispatch(changePullUpLoading(true))
    dispatch(changePageCount(count+1))
    if(hot){
      dispatch(refreshMoreHotSingerList())
    } else {
      dispatch(refreshMoreSingerList(category, alpha))
    }
  }
  // 顶部下拉刷新
  const pullDownRefreshDispatch = (category, alpha) => {
    dispatch(changePullDownLoading(true))
    dispatch(changePageCount(0))  // 属于重新获取数据
    if(category.type && alpha === ''){
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList(category, alpha))
    }
  }

  const handleUpdateAlpha = (val) => {
    setAlpha(val.key)
    updateDispatch(category, val.key)
  }
  const handleUpdateCatetory = (val) => {
    setCategory(val.category)
    updateDispatch(val.category, alpha)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category.type, pageCount)
  }
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha)
  }

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item, index) => {
            return (
              <ListItem key={String(item.accountId)+index}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('@/components/RecommendList/music.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }
  
  return (
    <NavContainer>
      <Horizen 
        list={categoryTypes} 
        title="分类 (默认热门):" 
        handleClick={handleUpdateCatetory} 
        oldVal={category.type ? category.type.toString()+category.area.toString() : ''}
      />
      <Horizen 
        list={alphaTypes} 
        title="首字母:" 
        handleClick={handleUpdateAlpha} 
        oldVal={alpha}
      />
      <ListContainer>
        <Scroll
          onScroll={forceCheck}
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
        >
          { renderSingerList() }
        </Scroll>
        <Loading show={enterLoading} />
      </ListContainer>
    </NavContainer>
  )
}

export default React.memo(Singers)