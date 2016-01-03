import TalksConstants from '../constants/TalksConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const TopicActions = {

  /**
   * @param  {string} name
   */
  create: function(name) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TOPIC_CREATE,
      name: name
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TOPIC_DESTROY,
      id: id
    });
  },

  like: function(id) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TOPIC_LIKE,
      id: id
    });
  },

  dislike: function(id) {
    AppDispatcher.dispatch({
      actionType: TalksConstants.TOPIC_DISLIKE,
      id: id
    });
  }

};

export default TopicActions;