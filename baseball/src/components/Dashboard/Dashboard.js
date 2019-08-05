import React from 'react';

function Dashboard(props) {
  return (
    <>
      <h3>Score Dashboard</h3>
      <div className="dashboard">
        <button onClick={props.handleStrike} className="strikesBtn">Strike</button>
        <button onClick={props.handleFoul} className="foulsBtn">foul</button>
        <button onClick={props.handleBall} className="ballsBtn">Ball</button>
        <button onClick={props.handleHit} className="hitBtn">hit</button>
      </div>
    </>
  )
}

export default Dashboard;