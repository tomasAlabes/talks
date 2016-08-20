import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const UserActions = {

  create: function(userProps) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.USER_CREATE,
      props: userProps
    });
  },

  edit: function(id, userProps) {
      AppDispatcher.dispatch({
        actionType: TalksConstants.USER_EDIT,
        id: id,
        props: userProps
      });
    },

  login: function(user) {
        AppDispatcher.dispatch({
          actionType: TalksConstants.USER_LOGIN,
          props: user
        });
  },

  logout: function() {
          AppDispatcher.dispatch({
            actionType: TalksConstants.USER_LOGOUT,
          });
   }

};

export default UserActions