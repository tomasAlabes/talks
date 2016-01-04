import React from 'react';
import TopicsStore from '../stores/TopicsStore';
import TopicActions from '../actions/TopicActions';

const TopicListItem = React.createClass({

  getInitialState: function() {
    return {
      topic: this.props.topic
    };
  },

  componentDidMount: function() {
    TopicsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TopicsStore.removeChangeListener(this._onChange);
  },

  render() {

    return (<li className="list-group-item">
      {this.state.topic.text}
        <span className="badge">
          {this.state.topic.likes}
        </span>
      <img src="src/images/like.svg" className="topicList__likeImg" onClick={this.likeTopic} alt="Like" />
      <img src="src/images/dislike.svg" className="topicList__likeImg" onClick={this.dislikeTopic} alt="Dislike" />
    </li>)

  },

  likeTopic() {
    TopicActions.like(this.state.topic.id);
  },

  dislikeTopic() {
    TopicActions.dislike(this.state.topic.id);
  },

  _onChange: function() {
    let topic = TopicsStore.getTopic(this.state.topic.id);
    if (topic !== undefined) { //has been deleted?
      this.setState({topic: topic});
    }
  }

});


export default TopicListItem;
