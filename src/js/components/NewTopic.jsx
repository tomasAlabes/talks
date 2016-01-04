import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Topic from '../model/Topic';
import TopicActions from '../actions/TopicActions'
import TopicsStore from '../stores/TopicsStore'

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState(){
    return {
      name: ''
    };
  },

  render() {

    return (
      <form className="form-inline addTopicForm" onSubmit={this.createTopic}>
        <fieldset className="form-group">
          <label htmlFor="newTopicName">Name</label>
          <input id="newTopicName" className="form-control" type="text" valueLink={this.linkState('name')}/>
        </fieldset>

        <button type="submit" className="btn btn-primary">Add Topic</button>
      </form>
    )
  },

  createTopic(e){
    e.preventDefault();
    if (TopicsStore.findByName(this.state.name) === undefined) {
      TopicActions.create(this.state.name);
    }
    this.setState({name: ''});
  }

});
