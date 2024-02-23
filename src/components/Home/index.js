import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {isLoading: true, teamCardsData: []}

  componentDidMount() {
    this.getTeamCards()
  }

  getTeamCards = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const formattedData = data.teams.map(eachObject => ({
      id: eachObject.id,
      name: eachObject.name,
      teamImageUrl: eachObject.team_image_url,
    }))

    this.setState({isLoading: false, teamCardsData: formattedData})
  }

  renderSpinner = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderTeamCards = () => {
    const {teamCardsData} = this.state
    return (
      <ul className="team-cards-container">
        {teamCardsData.map(eachObject => (
          <TeamCard teamDetails={eachObject} key={eachObject.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="ipl-name-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-main-heading">IPL Dashboard</h1>
        </div>
        <div>{isLoading ? this.renderSpinner() : this.renderTeamCards()}</div>
      </div>
    )
  }
}

export default Home
