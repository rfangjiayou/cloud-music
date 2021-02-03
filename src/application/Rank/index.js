import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRankList } from './store/actionCreators'
import { filterIndex } from '@/api/utils'
import {
  List,
  ListItem,
  SongList,
  Container,
  EnterLoading
} from './style'
import Scroll from '@/baseUI/Scroll'
import Loading from '@/baseUI/Loading'
import { renderRoutes } from 'react-router-config'

function Rank(props) {
  const rankList = useSelector(state => state.rank.rankList)
  const loading = useSelector(state => state.rank.loading)

  const dispatch = useDispatch()

  const globalStartIndex = filterIndex(rankList)
  const officialList = rankList.slice(0, globalStartIndex)
  const globalList = rankList.slice(globalStartIndex)

  // 榜单数据未加载出来之前都给隐藏
  const displayStyle = loading ? {"display":"none"} : {"display": ""}

  useEffect(() => {
    getRankListDataDispatch()
  }, [])

  const getRankListDataDispatch = () => {
    dispatch(getRankList())
  }

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  }

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgId + item.id} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt=""/>
                  <div className="decorate" />
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                { renderSongList(item.tracks) }
              </ListItem>
            )
          })
        } 
      </List>
    )
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}> {index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null
  }

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          { renderRankList(officialList) }
          <h1 className="global" style={displayStyle}>全球榜</h1>
          { renderRankList(globalList, true) }
          { loading ? <EnterLoading><Loading /></EnterLoading> : null }
        </div>
      </Scroll> 
      {renderRoutes(props.route.routes)}
    </Container>
  )
}

export default React.memo(Rank)