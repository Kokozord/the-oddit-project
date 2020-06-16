import React from 'react'
import { userContext } from './userContext.js'
import VoteButton from './voteButton.js'

export default class VoteController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {upvoted: false, downvoted: false, currentVote: null}
  }

  getVoteData = (id) => {
    fetch(`/api/votes/search?user_id=${id}&voteable_id=${this.props.voteableId}`)
    .then(response => {
      if (response) {
        return response.json()
      }
      else {
        return
      }})
    .then(response => {
      if (response.id) {
        console.log(response)
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.currentVote = response
        newState.upvoted = response.value === 1 ? true : false
        newState.downvoted = response.value === -1 ? true : false
        this.setState(newState)
      } else {
        console.log('rofl')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    if (!this.context.loggedIn) return
    this.getVoteData(this.context.user.id)
  }

  handleVote = (value) => {
    if (!this.context.loggedIn) {
      alert("you're not fucking logged in, you stupid little cunt, you absolute buffoon")
      return
    }
    if (this.currentVote) {
     this.updateVote(value, this.state.currentVote.id)
    } else {
     this.submitVote(value)
    }
  }

  submitVote = (value) => {
    const request = {
      user_id: this.context.user.id,
      voteable_type: this.props.voteableType,
      voteable_id: this.props.voteableId,
      value: value
    }
    fetch(`/api/votes/`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token }
    })
    .then(response => {
      if (response) {
        return response.json()
      }
      else {
        return
      }})
    .then(response => {
      if (response.id) {
        console.log(response)
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.currentVote = response
        newState.upvoted = response.value === 1 ? true : false
        newState.downvoted = response.value === -1 ? true : false
        this.setState(newState)
      } else {
        console.log('rofl')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  updateVote = (value, id) => {
    fetch(`/api/votes/`, {
      method: 'PATCH',
      body: JSON.stringify({value: value})
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.context.user.token }
    })
    .then(response => {
      if (response) {
        return response.json()
      }
      else {
        return
      }})
    .then(response => {
      if (response.id) {
        console.log(response)
        const newState = JSON.parse(JSON.stringify(this.state))
        newState.currentVote = response
        newState.upvoted = response.value === 1 ? true : false
        newState.downvoted = response.value === -1 ? true : false
        this.setState(newState)
      } else {
        console.log('rofl')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render () {
    return (
      <div>
        <VoteButton disabled={!this.state.upvoted} handleVote={this.handleVote} value={1}/>
        <div>{this.props.score}</div>
        <VoteButton disabled={!this.state.downvoted} handleVote={this.handleVote} value={-1}/>
      </div>
    )
  }
}

VoteController.contextType = userContext