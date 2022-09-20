import React from 'react'
import './CoinInfo.css'

const SelectButton = ({children, selected, onClick}) => {
  return (
    <span onClick={onClick} className="buttons"
    style={{
    backgroundColor: selected ? "#486DFB" : "",
    fontWeight: selected ? 700 :500,
    width:"22%",
    }}
    >{children}</span>
  )
}

export default SelectButton