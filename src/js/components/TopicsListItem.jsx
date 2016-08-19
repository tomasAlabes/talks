import React from 'react';
import TopicsStore from '../stores/TopicsStore';
import UsersStore from '../stores/UsersStore';
import TopicActions from '../actions/TopicActions';
import UserActions from '../actions/UserActions';

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
      <img src="src/images/delete.svg" className="topicList__likeImg" onClick={this.deleteTopic} alt="Delete" />
        <span className="badge">
          {this.state.topic.likes}
        </span>
      <img src="src/images/like.svg" className="topicList__likeImg" onClick={this.likeTopic} alt="Like" />
      <img src="src/images/dislike.svg" className="topicList__likeImg" onClick={this.dislikeTopic} alt="Dislike" />
    </li>)

  },

  likeTopic() {
    let currentUser = UsersStore.getCurrentUser();
    if(currentUser !== null && currentUser !== undefined && currentUser.topics != undefined &&currentUser.topics.includes(this.state.topic.text)){
      TopicActions.like(this.state.topic.id);
      let index = currentUser.topics.indexOf(this.state.topic.text);
      currentUser.topics.splice(index, 1);
      UserActions.edit(UsersStore.getCurrentUserId(),currentUser );
    }

  },

  dislikeTopic() {
    let currentUser = UsersStore.getCurrentUser();
    if(currentUser !== null && currentUser !== undefined && currentUser.topics === undefined){
       TopicActions.dislike(this.state.topic.id);
       currentUser.topics = [];
       currentUser.topics.push(this.state.topic.text);
       UserActions.edit(UsersStore.getCurrentUserId(),currentUser);
    }
    else if(currentUser !== null && currentUser !== undefined && (currentUser.topics != undefined) && (!currentUser.topics.includes(this.state.topic.text))){
       TopicActions.dislike(this.state.topic.id);
       currentUser.topics.push(this.state.topic.text);
       UserActions.edit(UsersStore.getCurrentUserId(),currentUser);
    }
  },

  deleteTopic() {
    TopicActions.destroy(this.state.topic.id);
    let allUsers = this.getAllUsers();
    for (var key in allUsers){
     let user = allUsers[key];
     if(user.topics != undefined && user.topics.includes(this.state.topic.text)){
       let index = user.topics.indexOf(this.state.topic.text);
       user.topics.splice(index, 1);
       UserActions.edit(UsersStore.findKeyByEmail(user.emailid),user );
      }
    }
  },

  getAllUsers(){
            return Array.from(UsersStore.getAll().values());
  },

  _onChange: function() {
    let topic = TopicsStore.getTopic(this.state.topic.id);
    if (topic !== undefined) { //has been deleted?
      this.setState({topic: topic});
    }
  }

});


export default TopicListItem;
