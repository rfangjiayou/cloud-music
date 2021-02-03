import React from 'react'
import styled, { keyframes } from'styled-components'
import style from '@/assets/global-style'
import PropTypes from "prop-types"

const marquee = keyframes`
  from {
    left: 100%;
  }
  to {
    left: -100%;
  }
`

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  height: 40px;
  width: calc(100% - 20px);
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style["font-color-light"]};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  .marquee {
    width: 100%;
    height: 35px;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    h1 {
      position: absolute;
      animation: ${marquee} 6s linear infinite;
    }
  }
  >h1 {
    font-size: ${style["font-size-l"]};
    font-weight: 700;
  }
`
// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      {
        isMarquee ? <div className="marquee"><h1>{title}</h1></div> :
        <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false
}

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
}

export default React.memo(Header)