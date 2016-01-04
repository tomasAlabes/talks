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
        <h4 className="list-group-item-heading nextTalksItem__title">
          {talk.title}
        </h4>
        <span className="list-group-item-text nextTalksItem__date">
            {talk.moment.format('MMM D, h:mm a')}
        </span>

        <p className="list-group-item-text nextTalksItem__description">
          {talk.description || 'No Description'}
        </p>
        <p className="list-group-item-text nextTalksItem__topics">
          Topics: {talk.talkTopics.map(topic => topic.text).join(', ')}
        </p>

        {this.getZoomLink()}
      </div>
    );
  },

  getZoomLink(){
    let zoomlink;
    if(this.state.talk.zoomLink !== '') {
      zoomlink = (
        <p className="list-group-item-text">
          <a href={this.state.talk.zoomLink}>Zoom Link</a>
        </p>);
    }else{
      zoomlink = "";
    }

    return zoomlink;
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