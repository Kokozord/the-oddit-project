import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default class UserSidebar extends React.Component {

  renderHallsList = (list) => {
    const halls = []
    list.forEach(hall => {
      halls.push(<Link key={hall.id} to={`/halls/${hall.name}`}>{hall.name}</Link>)
    })
    return halls
  }

  render () {
    return(
      <Container className='user-sidebar' fluid>
      <div className='user-sidebar-info'>
        <h4 className='user-sidebar-name'>{this.props.name}</h4>
        <h6><span>{this.props.upvotes}</span> upvotes</h6>
        <h6><span>{this.props.postCount}</span> posts</h6>
        <h6><span>{this.props.commentCount}</span> comments</h6>
      </div>
      <div className='user-owned-halls'>
        <h6><span>Creator of: </span></h6>
        {this.renderHallsList(this.props.ownedHalls)}
      </div>
      <div className='user-moderated-halls'>
        <h6><span>Moderator of: </span></h6>
        {this.renderHallsList(this.props.moderatedHalls)}
      </div>
      </Container>

    )
  }
}
