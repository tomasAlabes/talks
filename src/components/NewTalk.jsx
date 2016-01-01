import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Talk from '../model/Talk';
import TalkActions from '../actions/TalkActions';
import TopicActions from '../actions/TopicActions';
import TopicStore from '../stores/TopicsStore';
import Datetime from 'react-datetime';

export default React.createClass({

  mixins: [LinkedStateMixin],

  propTypes: {
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    topics: React.PropTypes.string,
    date: React.PropTypes.object
  },

  getInitialState(){
    return {};
  },

  render() {

    return (
      <form onSubmit={this.createTalk}>
        <h3>New Talk</h3>

        <fieldset className="form-group">
          <label htmlFor="newTalkTitle">Title</label>
          <input id="newTalkTitle" className="form-control" type="text" valueLink={this.linkState('title')} placeholder="Javascript + Angular" required/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkDescription">Description</label>
          <textarea id="newTalkDescription" className="form-control" rows="3" valueLink={this.linkState('description')} placeholder="Want to know how about Angular?" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkTopics">Topics</label>
          <input id="newTalkTopics" className="form-control" type="text" valueLink={this.linkState('topics')} placeholder="javascript,angular" title="Comma Separated Topics" required pattern="^[0-9a-zA-z]+(,[0-9a-zA-z]+)$"/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkDate">Date</label>
          <Datetime value={this.state.date} onChange={this.dateChanged} inputProps={{readOnly:true, required:true}} isValidDate={this.isValidDate} />
        </fieldset>

        <button type="submit" className="btn btn-primary">Create Talk</button>
      </form>
    )
  },

  dateChanged(date){
    this.setState({date: date});
  },

  isValidDate(date){
    return date.isAfter(new Date());
  },

  createTalk(e){
    e.preventDefault();
    //ToDo Topic not found?
    let topics = this.state.topics.split(',').map(topicName => TopicStore.findByName(topicName) || TopicActions.create(topicName));
    //ToDo check fields not empty
    TalkActions.create({title: this.state.title, description: this.state.description, topics: topics, date: this.state.date});
  }

});
