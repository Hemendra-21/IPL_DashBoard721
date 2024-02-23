import './index.css'
import {match} from 'assert'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = matchDetails

  const matchStatusClassName = matchStatus === 'Won' ? 'game-won' : 'game-lost'

  return (
    <li className="match-card-container">
      <img
        src={competingTeamLogo}
        alt={competingTeam}
        className="match-card-team-logo"
      />
      <h1>{competingTeam}</h1>
      <p>{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
