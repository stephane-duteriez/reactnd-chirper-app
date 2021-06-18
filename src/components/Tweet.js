import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import {handleToggleTweet} from '../actions/tweets'

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, tweet, authedUser } = this.props

    dispatch(handleToggleTweet({
      id : tweet.id,
      authedUser : authedUser,
      hasLiked : tweet.hasLiked
    }))
  }
  toParent = (e, id) => {
    e.preventDefault()
    // todo : Redirect to parent tweet
  }
  render() {
    const { tweet } = this.props

    if ( tweet === null ) {
      return <p>This text doesn't existe</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
    } = tweet

    return (
      <div className='tweet'>
        <img 
          src={avatar}
          alt={`avatar of ${name}`}
           className='avatar'/>
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            { parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying T @{parent.author}
              </button>
            )}
            <p>{ text }</p>
          </div>
          <div className='tweet-icons'>
              <TiArrowBackOutline className='tweet-icons'/>
              <span>{replies !== 0 && replies}</span>
              <button className='heart-button' onClick={(e) => this.handleLike(e, id)}>
                {hasLiked === true 
                ? <TiHeartFullOutline color='red' className='tweet-icons'/>
                : <TiHeartOutline className='tweet-icons'/>}
              </button>
              <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, tweets}, { id }) {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return  {
    authedUser,
    tweet: tweet ? 
      formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}

export default connect(mapStateToProps)(Tweet)