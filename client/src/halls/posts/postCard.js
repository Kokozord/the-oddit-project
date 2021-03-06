import React from 'react'
import {
  Link
} from 'react-router-dom'
import {  Row, Col, Container } from 'react-bootstrap'
import VoteController from './controls/voteController.js'
import ContentControls from './controls/contentControls.js'
import LinkPreview from './linkPreview.js'

export default class PostCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {preview: null}
  }

  render () {
    return (
      <Container fluid className='post-card'>
        <Row>
        <Col className='vote-controller-column' xs='auto' sm='auto' md='auto' lg='auto'>
          <VoteController voteableId={this.props.post.id} score={this.props.post.score} voteableType='Post'/>
        </Col>
        <Col xs='auto' sm='auto' md='auto' lg='auto' className='post-preview-container'>
        { !this.props.post.url && !this.props.post.image.url && <img alt='oddit-icon' className='post-card-img' src="/favicon.ico"/>}
        { this.props.post.url && <LinkPreview url={this.props.post.url}/> }
        { this.props.post.image.url &&
        <div>
          <img className='post-card-img' alt='post-attachment' src={this.props.post.image.url}/>
        </div>}
        </Col>
        <Col className='post-card-content'>
          <div className='post-card-info mt-2 mb-2 text-muted'>Posted in <Link className='link' to={this.props.hallURL}>{this.props.post.hall.name}</Link> by <Link className='link' to={`/users/${this.props.post.user.name}`}>{this.props.post.user.name}</Link>
          </div>
          <div className='post-card-title-container'><Link className='post-card-title' to={this.props.postURL}>{this.props.post.title}</Link></div>
          { this.props.post.url &&
          <div className='post-card-link'> <a className='post-link' href={this.props.post.url}>{this.props.post.url}</a></div>}
          <ContentControls hallId={this.props.post.hall.id} postCard={true} id={this.props.post.user.id} type='post' path={this.props.postURL} comments_count={this.props.post.comments_count}/>
        </Col>
        </Row>
      </Container>
    )
  }
}
