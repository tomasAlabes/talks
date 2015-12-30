import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Talk from '../model/Talk';

//not an es6 class because I need mixins
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
      <form onSubmit={this.createTalk}>
        <h2>New Talk</h2>

        <fieldset className="form-group">
          <label htmlFor="newTalkName">Name</label>
          <input id="newTalkName" className="form-control" type="text" valueLink={this.linkState('name')}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkDescription">Description</label>
          <textarea id="newTalkDescription" className="form-control" rows="3" valueLink={this.linkState('description')}/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkTopics">Topics</label>
          <input id="newTalkTopics" className="form-control" type="text" valueLink={this.linkState('topics')}/>
        </fieldset>

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    )
  },

  createTalk(e){
    let talk = new Talk({name: this.state.name, description: this.state.description, topics:[]});

    console.log(`${talk.name}, ${talk.description}`);
    e.preventDefault();
  }

});
