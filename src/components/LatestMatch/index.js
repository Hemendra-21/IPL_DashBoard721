import './index.css'

const LatestMatch = props => {
  const {latestMatchData} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    id,
    manOfTheMatch,
    matchStatus,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestMatchData

  return (
    <div className="latest-match-container">
      <div className="left-side-container">
        <p className="competing-team">{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <div className="middle-side-container">
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="competing-team-icon"
        />
      </div>
      <div className="right-side-container">
        <p className="question">First Innings</p>
        <p className="answer">{firstInnings}</p>
        <p className="question">Second Innings</p>
        <p className="answer">{secondInnings}</p>
        <p className="question">Man Of The Match</p>
        <p className="answer">{manOfTheMatch}</p>
        <p className="question">Umpires</p>
        <p className="answer">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
