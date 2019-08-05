import React from 'react';

function Display(props) {
  return (
    <>
      <h3>Score Console</h3>
      <div className="display">
        <p className="pStrikes">Strikes: {props.strikes}</p>
        <p className="pBalls">balls: {props.balls}</p>
        <p className="pOuts">outs: {props.outs}</p>
      </div>
    </>
  )
}

export default Display;