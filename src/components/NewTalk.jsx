import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Talk from '../model/Talk';

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState(){
    return {
      name: '',
      description: '',
      topics: ''
    };
  },

  render() {

    return (
      <form onSubmit={this.createTopic}>
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

        <button type="submit" className="btn btn-primary">Create Talk</button>
      </form>
    )
  },

  createTalk(e){
    let talk = new Talk({name: this.state.name, description: this.state.description, topics:[]});
    e.preventDefault();
  }

});
