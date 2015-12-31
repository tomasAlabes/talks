import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const TalkActions = {

  create: function(talkProps) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TALK_CREATE,
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