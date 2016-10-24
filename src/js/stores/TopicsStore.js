import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Topic from '../model/Topic';
import firebaseConnection from './FirebaseConnection';

const topicsRef = firebaseConnection.child('/topics');

let _topics = new Map();

topicsRef.on('value', function(snapshot) {
  if (snapshot.exists()) {
    snapshot.forEach(topic => {
      // Recreating Topic every time...
      let receivedTopic = new Topic(topic.val());
      receivedTopic.id = topic.key;
      _topics.set(topic.key, receivedTopic);
    });
    TopicsStore.emitChange();
  }
});

topicsRef.on('child_removed', function(oldChildSnapshot) {
  if (oldChildSnapshot.exists()) {
    _topics.delete(oldChildSnapshot.key);
    TopicsStore.emitChange();
  }
});

const CHANGE_EVENT = 'change';

function create(text) {
  topicsRef.push(new Topic({
    text: text
  }));
}

function destroy(id) {
  topicsRef.child(id).set(null);
}

function like(id){
  topicsRef.child(id).update({likes: ++_topics.get(id).likes});
}

function dislike(id){
  let newLikes = _topics.get(id).likes - 1;
  if ((newLikes) >= 0) {
    topicsRef.child(id).update({likes: newLikes});
  }
}

const TopicsStore = Object.assign({}, EventEmitter.prototype, {

  findByName(text){
    return Array.from(_topics.values()).filter(topic => topic.text === text)[0];
  },

  getTopic(id){
    return _topics.get(id);
  },

  getAll(){
    return _topics;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch (action.actionType) {
    case TalksConstants.TOPIC_CREATE:
      let text = action.name;
      if (text !== '') {
        create(text);
        TopicsStore.emitChange();
      }
      break;
    case TalksConstants.TOPIC_DESTROY:
      destroy(action.id);
      TopicsStore.emitChange();
      break;
    case TalksConstants.TOPIC_LIKE:
      like(action.id);
      TopicsStore.emitChange();
      break;
    case TalksConstants.TOPIC_DISLIKE:
      dislike(action.id);
      TopicsStore.emitChange();
      break;

    default:
      // no op
  }
});

export default TopicsStore;