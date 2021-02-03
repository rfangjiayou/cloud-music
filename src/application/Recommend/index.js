import React, { useEffect } from 'react'
import Slider from '@/components/Slider'
import RecommendList from '@/components/RecommendList'
import Scroll from '@/baseUI/Scroll'
import { Content } from './style'
import { useSelector, useDispatch } from 'react-redux'
import {
  getBannerList,
  getRecommendList
} from './store/actionCreators'
import { forceCheck } from 'react-lazyload'
import Loading from '@/baseUI/Loading'
import { renderRoutes } from 'react-router-config'

function Recommend(props) {
  const bannerList = useSelector(state => state.recommend.bannerList)
  const recommendList = useSelector(state => state.recommend.recommendList)
  const enterLoading = useSelector(state => state.recommend.enterLoading)

  const dispatch = useDispatch() 

  useEffect(() => {
    if(!bannerList.length) {
      dispatch(getBannerList())
    }
    if(!recommendList.length) {
      dispatch(getRecommendList())
    }
  }, [])

  // 下拉刷新
  const refersh = () => {
    dispatch(getBannerList())
    dispatch(getRecommendList())
  }

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck} pullDown={refersh}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      <Loading show={enterLoading} />
      { renderRoutes(props.route.routes) }
    </Content> 
  )
}

export default React.memo(Recommend)