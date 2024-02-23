import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesData: {}}

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()

    const formattedMatchesData = {
      latestMatchDetails: this.getFormattedData(
        fetchedData.latest_match_details,
      ),
      recentMatches: fetchedData.recent_matches.map(eachObject =>
        this.getFormattedData(eachObject),
      ),
      teamBannerUrl: fetchedData.team_banner_url,
    }
    this.setState({isLoading: false, teamMatchesData: formattedMatchesData})
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderTeamMatchesData = () => {
    const {teamMatchesData} = this.state

    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData
    return (
      <div className="team-matches-data-card">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <p className="latest-matches-text">Latest Matches</p>
        <LatestMatch latestMatchData={latestMatchDetails} />
        <ul className="match-cards-container">
          {recentMatches.map(eachObject => (
            <MatchCard matchDetails={eachObject} key={eachObject.id} />
          ))}
        </ul>
      </div>
    )
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const routeClassName = `team-matches-card-container ${this.getRouteClassName()}`

    return (
      <div className={routeClassName}>
        {isLoading ? this.renderLoader() : this.renderTeamMatchesData()}
      </div>
    )
  }
}

export default TeamMatches
