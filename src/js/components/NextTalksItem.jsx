import React from 'react';
import TalkStore from '../stores/TalksStore';

export default React.createClass({

  getInitialState(){
    return {
      talk: this.props.talk
    }

  },

  render(){
    let talk = this.state.talk;

    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">
          {talk.title}
        </h4>
        <p className="list-group-item-text">
          {talk.description || 'No Description'}
        </p>
        <p className="list-group-item-text">
          {talk.talkTopics.map(topic => topic.text).join(', ')}
        </p>
        <p className="list-group-item-text">
          {talk.moment.fromNow()}
        </p>
      </div>
    );
  },

  componentDidMount: function() {
    TalkStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TalkStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    let talk = TalkStore.getTalk(this.state.talk.id);
    if (talk !== undefined) { //has been deleted?
      this.setState({talk: talk});
    }
  }

});