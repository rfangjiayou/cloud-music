import React from 'react'
import { IconStyle } from './assets/iconfont/iconfont'
import { GlobalStyle } from  './style'
import { renderRoutes } from 'react-router-config'// renderRoutes 读取路由配置转化为 Route 标签
import routes from './routes/index.js'
import { HashRouter } from 'react-router-dom'

const App = () => {
  return (
    <HashRouter>
      <GlobalStyle />
      <IconStyle />
      { renderRoutes(routes) }
    </HashRouter>
  )
}

export default App