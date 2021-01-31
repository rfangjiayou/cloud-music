import {
  CHANGE_BANNER,
  CHANGE_RECOMMEND_LIST,
  CHANGE_ENTER_LOADING
} from './constants'
import { getBannerRequest, getRecommendListRequest } from '@/api/request'

const changeBannerList = (data) => ({
  type: CHANGE_BANNER,
  data: data
})

const changeRecommendList = (data) => ({
  type: CHANGE_RECOMMEND_LIST,
  data: data
})

const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.banners))
    }).catch (() => {
      console.log ("轮播图数据传输错误")
    }) 
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch (changeRecommendList(data.result))
      dispatch (changeEnterLoading (false))
    }).catch (() => {
      console.log ("推荐歌单数据传输错误")
    })
  }
}