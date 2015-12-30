import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default TopicActions = {

  /**
   * @param  {string} text
   */
  create: function(talk) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TALK_CREATE,
      talk: talk
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TALK_DESTROY,
      id: id
    });
  }

}