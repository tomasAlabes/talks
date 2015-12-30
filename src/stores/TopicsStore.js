import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Topic from '../model/Topic';

let _topics = new Map();
const CHANGE_EVENT = 'change';

function create(name) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _topics.set(id, new Topic({
    id: id,
    name: name
  }));
}

function destroy(id) {
  delete _topics.delete(id);
}

function like(id){
  _topics.get(id).addLike();
}

const TopicsStore = Object.assign({}, EventEmitter.prototype, {

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
  var text;

  switch(action.actionType) {
    case TalksConstants.TOPIC_CREATE:
      text = action.name;
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

    default:
      // no op
  }
});

export default TopicsStore;