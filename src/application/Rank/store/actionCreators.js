import { getRankListRequest } from '@/api/request'
import {
  CHANGE_RANK_LIST,
  CHANGE_LOADING
} from './constants'


const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data
})

const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data
})

// 第一次加载热门歌手
export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then(data => {
      let list = data && data.list || []
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    }).catch(() => {
      console.log('排行榜数据获取失败')
    })
  }
}