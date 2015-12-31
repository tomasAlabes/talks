import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Talk from '../model/Talk';
import TalkActions from '../actions/TalkActions';
import Datetime from 'react-datetime';

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState(){
    return {
      name: '',
      description: '',
      topics: '',
      date: ''
    };
  },

  render() {

    return (
      <form onSubmit={this.createTalk}>
        <h3>New Talk</h3>

        <fieldset className="form-group">
          <label htmlFor="newTalkName">Name</label>
          <input id="newTalkName" className="form-control" type="text" valueLink={this.linkState('name')} placeholder="Javascript + Angular"/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkDescription">Description</label>
          <textarea id="newTalkDescription" className="form-control" rows="3" valueLink={this.linkState('description')} placeholder="Want to know how about Angular?" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkTopics">Topics</label>
          <input id="newTalkTopics" className="form-control" type="text" valueLink={this.linkState('topics')} placeholder="javascript,angular" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkDate">Date</label>
          <Datetime />
        </fieldset>

        <button type="submit" className="btn btn-primary">Create Talk</button>
      </form>
    )
  },

  createTalk(e){
    e.preventDefault();
    TalkActions.create({name: this.state.name, description: this.state.description, topics:[]});
  }

});
