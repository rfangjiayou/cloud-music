import React from 'react'
import styled from'styled-components'
import Scroll from '../Scroll'
import { PropTypes } from 'prop-types'
import style from '@/assets/global-style'

const List = styled.div`
  display: inline-block;
  white-space: nowrap; 
  line-height: 22px;
  >span:first-of-type {
    display: inline-block;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
  }
`
const ListItem = styled.span`
  font-size: ${style["font-size-m"]};
  padding: 3px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function HorizenItem(props) {
  const { list, oldVal, title } = props
  const { handleClick } = props

  return (
    <Scroll direction="horizental">
      <List>
        <span>{title}</span>
        {
          list.map ((item) => {
            return (
              <ListItem 
                key={item.key}
                className={`${oldVal === item.key ? 'selected': ''}`} 
                onClick={() => handleClick(item)}>
                {item.name}
              </ListItem>
            )
          })
        }
      </List>
    </Scroll>
  )
}

HorizenItem.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
}

HorizenItem.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default React.memo(HorizenItem)
