import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import TalkActions from '../actions/TalkActions';
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
      <form onSubmit={this.createTalk} className="form-horizontal newTalkForm">
        <h3 className="newTalkForm__header">New Talk</h3>

        <fieldset className="form-group">
          <label htmlFor="newTalkTitle">Title*</label>
          <input id="newTalkTitle" className="form-control" type="text" valueLink={this.linkState('title')} placeholder="The title of your awesome talk" required maxLength="50" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkDescription">Description</label>
          <textarea id="newTalkDescription" className="form-control" rows="3" valueLink={this.linkState('description')} placeholder="A description of the size of a tweet." maxLength="140" />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkDate">Date</label>
          <Datetime value={this.state.date} onChange={this.dateChanged} inputProps={{readOnly:true, placeholder: 'When?'}} isValidDate={this.isValidDate} />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkTopics">Topics</label>
          <ReactTags tags={this.state.talkTopics}
                     suggestions={this.state.suggestions}
                     handleDelete={this.handleDelete}
                     handleAddition={this.handleAddition}
                     placeholder={'What is it about?'}
                     autofocus={false}
                     allowDeleteFromEmptyInput={true}
                     handleDrag={this.handleDrag} />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkZoomlink">Zoom Link</label>
          <input id="newTalkZoomLink" className="form-control" type="text" valueLink={this.linkState('zoomLink')} placeholder="Zoom link for the talk"/>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="newTalkAuthor">Author*</label>
          <input id="newTalkAuthor" className="form-control" type="text" valueLink={this.linkState('author')} placeholder="Who's the author?" required/>
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
    let topics = this.state.talkTopics.map(topic => TopicsStore.findByName(topic.text));
    TalkActions.create({title: this.state.title, description: this.state.description, talkTopics: topics, date: this.state.date, zoomLink: this.state.zoomLink, author: this.state.author});

    this.setState({title: '', description: '', talkTopics: [], date: '', zoomLink: '', author: ''});
  },

  getStoreTopicsNames() {
    return this.getAllTopics().map(topic => topic.text);
  },

  _onChange: function() {
    this.setState({suggestions: this.getStoreTopicsNames()});
  },

  getAllTopics(){
    return Array.from(TopicsStore.getAll().values());
  }

});
