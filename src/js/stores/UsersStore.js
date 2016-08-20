import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import User from '../model/User';
import firebaseConnection from './FirebaseConnection';


const usersRef = firebaseConnection.child('/users');

let _users = new Map();
let currentUser = null;

usersRef.on('value', function(snapshot) {
  if (snapshot.exists()) {
    snapshot.forEach(user => {
      let receivedUser = new User(user.val());
      receivedUser.id = user.key();
      _users.set(user.key(), receivedUser);
      if (currentUser !== null && receivedUser.emailid === currentUser.emailid) currentUser = receivedUser;
    });
    UsersStore.emitChange();
  }
});

usersRef.on('child_removed', function(oldChildSnapshot) {
  if (oldChildSnapshot.exists()) {
    _users.delete(oldChildSnapshot.key());
    UsersStore.emitChange();
  }
});

const CHANGE_EVENT = 'change';

function create(props) {
  usersRef.push(new User(props));
}

function edit(id, props) {
  usersRef.child(id).update(props);
}

function login(props) {
  currentUser = props;
}

function logout(props) {
  currentUser = null;
}


const UsersStore = Object.assign({}, EventEmitter.prototype, {
  findKeyByEmail(text){
      return Array.from(_users.keys()).filter(key => _users.get(key).emailid === text)[0];
  },

  findUserByEmail(text){
        return Array.from(_users.values()).filter(user => user.emailid === text)[0];
  },

  findUserByGuid(text){
          return Array.from(_users.values()).filter(user => user.guid === text)[0];
  },

  getCurrentUserId(){
    return this.findKeyByEmail(currentUser.emailid);
  },

  getCurrentUser(){
      return currentUser;
  },

  getAll(){
    return _users;
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
    case TalksConstants.USER_CREATE:
      create(action.props);
      UsersStore.emitChange();
      break;
    case TalksConstants.USER_EDIT:
      edit(action.id, action.props);
      UsersStore.emitChange();
      break;
    case TalksConstants.USER_LOGIN:
      login(action.props);
      UsersStore.emitChange();
      break;
    case TalksConstants.USER_LOGOUT:
      logout();
      UsersStore.emitChange();
      break;

    default:
      // no op
  }
});

export default UsersStore;