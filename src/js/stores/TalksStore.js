import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import Talk from '../model/Talk';
import firebaseConnection from './FirebaseConnection';

const talksRef = firebaseConnection.child('/talks');

let _talks = new Map();

talksRef.on('value', function(snapshot) {
  if (snapshot.exists()) {
    snapshot.forEach(talk => {
      let receivedTalk = new Talk(talk.val());
      receivedTalk.id = talk.key();
      _talks.set(talk.key(), receivedTalk);
    });
    TalksStore.emitChange();
  }
});

talksRef.on('child_removed', function(oldChildSnapshot) {
  if (oldChildSnapshot.exists()) {
    _talks.delete(oldChildSnapshot.key());
    TalksStore.emitChange();
  }
});

const CHANGE_EVENT = 'change';

function create(props) {
  talksRef.push(new Talk(props));
}

function edit(id, props) {
  talksRef.child(id).update(props);
}

function destroy(id) {
  talksRef.child(id).set(null);
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
    case TalksConstants.TALK_EDIT:
      edit(action.id, action.props);
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