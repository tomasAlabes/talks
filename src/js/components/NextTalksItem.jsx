import React from 'react';
import TalkStore from '../stores/TalksStore';
import UsersStore from '../stores/UsersStore';
import EditTalkModal from './EditTalkModal'
import Login from './login'
import Register from './register'
import TalkActions from '../actions/TalkActions'

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
          <img className="topicList__likeImg" src="src/images/delete.svg" alt="delete" onClick={this.deleteTalk} />
          <img className="topicList__likeImg" src="src/images/edit.svg" alt="edit" onClick={this.editTalk} />
          <Register ref="editModal" talk={this.state.talk} />
        </h4>
        <p className="list-group-item-text nextTalksItem__description">
          {talk.description || 'No Description'}
        </p>
        <p className="list-group-item-text nextTalksItem__topics">
          Topics: {talk.talkTopics.map(topic => topic.text).join(', ')}
        </p>
        <p className="list-group-item-text">
          By {talk.author}
        </p>

        {this.getZoomLink()}
        {this.getWikiLink()}

        <span className="nextTalksItem__date">
          {talk.date ? talk.moment.format('MMM D, h:mm a') : ''}
        </span>
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
      zoomlink = '';
    }

    return zoomlink;
  },

  getWikiLink(){
    let wikilink;
    if(this.state.talk.wikiLink !== '') {
	    wikilink = (
        <p className="list-group-item-text">
          <a href={this.state.talk.wikiLink}>Wiki Link</a>
        </p>);
    }else{
    	wikilink = '';
    }

    return wikilink;
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
  },

  editTalk(){
    this.refs.editModal.show();
  },

  deleteTalk(){
    TalkActions.destroy(this.state.talk.id);
  }

});