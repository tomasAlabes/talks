import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Talk from '../model/Talk';

let _talks = new Map();
const CHANGE_EVENT = 'change';

function create(props) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  props.id = id;
  _talks.set(id, new Talk(props));
}

function destroy(id) {
  delete _talks.delete(id);
}

const TalksStore = Object.assign({}, EventEmitter.prototype, {

  getTalk(id){
    return _talks.get(id);
  },

  getAll(){
    return _talks;
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
    case TalksConstants.TALK_CREATE:
      create(action.props);
      TalksStore.emitChange();
      break;
    case TalksConstants.TALK_DESTROY:
      destroy(action.id);
      TalksStore.emitChange();
      break;

    default:
      // no op
  }
});

export default TalksStore;