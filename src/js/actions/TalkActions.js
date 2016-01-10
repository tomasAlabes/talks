import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const TalkActions = {

  create: function(talkProps) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TALK_CREATE,
      props: talkProps
    });
  },

  edit: function(id, talkProps) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TALK_EDIT,
      id: id,
      props: talkProps
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TALK_DESTROY,
      id: id
    });
  }

};

export default TalkActions