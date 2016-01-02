import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Talk from '../model/Talk';
import TalkActions from '../actions/TalkActions';
import TopicActions from '../actions/TopicActions';
import TopicsStore from '../stores/TopicsStore';
import Datetime from 'react-datetime';
import { WithContext as ReactTags } from 'react-tag-input';

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState(){
    return {
      suggestions: this.getStoreTopicsNames(),
      talkTopics: []
    };
  },
  
  componentDidMount: function() {
    TopicsStore.addChangeListener(this._onChange);
  },
  
  componentWillUnmount: function() {
    TopicsStore.removeChangeListener(this._onChange);
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
          <ReactTags tags={this.state.talkTopics}
                     suggestions={this.state.suggestions}
                     handleDelete={this.handleDelete}
                     handleAddition={this.handleAddition}
                     handleDrag={this.handleDrag} />
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
  
  handleDelete: function (i) {
    var topics = this.state.talkTopics;
    topics.splice(i, 1);
    this.setState({topics: topics});
  },

  handleAddition: function (topic) {
    var talkTopics = this.state.talkTopics;
    if (this.getStoreTopicsNames().includes(topic) && !talkTopics.map(topic => topic.text).includes(topic)) {
      talkTopics.push({
        id: talkTopics.length + 1,
        text: topic
      });
      this.setState({topics: talkTopics});
    }
  },

  handleDrag: function(topic, currPos, newPos) {
    var topics = this.state.talkTopics;

    // mutate array
    topics.splice(currPos, 1);
    topics.splice(newPos, 0, topic);

    // re-render
    this.setState({ topics: topics });
  },

  createTalk(e){
    e.preventDefault();
    //ToDo Topic not found?
    let topics = this.state.talkTopics.split(',').map(topicName => TopicsStore.findByName(topicName) || TopicActions.create(topicName));
    //ToDo check fields not empty
    TalkActions.create({title: this.state.title, description: this.state.description, topics: topics, date: this.state.date});
  },

  getStoreTopicsNames() {
    return this.getAllTopics().map(topic => topic.name);
  },

  _onChange: function() {
    this.setState({suggestions: this.getStoreTopicsNames()});
  },

  getAllTopics(){
    return Array.from(TopicsStore.getAll().values());
  }

});
