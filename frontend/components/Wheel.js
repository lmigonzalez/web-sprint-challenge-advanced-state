import React from 'react';
import reducer from '../state/reducer';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';
import { connect, useDispatch } from 'react-redux';



function Wheel(props) {
 const {pos} = props
 const dispatch = useDispatch()


  const divs = [
    {className: 'cog', style:{'--i': 0}, value: 0},
    {className: 'cog', style:{'--i': 1}, value: 1},
    {className: 'cog', style:{'--i': 2}, value: 2},
    {className: 'cog', style:{'--i': 3}, value: 3},
    {className: 'cog', style:{'--i': 4}, value: 4},
    {className: 'cog', style:{'--i': 5}, value: 5},
  ]

 
  return (
    <div id="wrapper">
      <div id="wheel">

       {divs.map((div, index)=>{
         return(
           <div
            key={index}
            style= {div.style}
            className= {pos === div.value ? ' cog active' : 'cog'}
            value = {div.value}
            
            >
              {pos === div.value? 'B' : ''}
            </div>
         )
       })}        
        
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => dispatch(moveCounterClockwise())} >Counter clockwise</button>

        <button id="clockwiseBtn" onClick={() => dispatch(moveClockwise())}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state =>{
  return({
    pos: state.wheel
  })
}

export default  connect(mapStateToProps)(Wheel)
