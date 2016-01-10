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
      id: this.props.talk.id,
      talkTopics: this.props.talk.talkTopics,
      title: this.props.talk.title,
      author: this.props.talk.author,
      description: this.props.talk.description,
      date: this.props.talk.moment,
      zoomLink: this.props.talk.zoomLink
    };
  },

  show() {
    $(this.refs.modal).modal();
  },
  hide() {
    $(this.refs.modal).modal('hide');
  },

  componentDidMount: function() {
    TopicsStore.addChangeListener(this._onChange);
  },
  
  componentWillUnmount: function() {
    TopicsStore.removeChangeListener(this._onChange);
  },
  
  render() {
  
    return (
      <div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="editTalkModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="editTalkModalLabel">Edit Talk</h4>
            </div>
            <div className="modal-body">
                <fieldset className="form-group">
                  <label htmlFor="newTalkTitle">Title*</label>
                  <input id="newTalkTitle" className="form-control" type="text" valueLink={this.linkState('title')}
                         placeholder="The title of your awesome talk" required maxLength="50"/>
                </fieldset>

                <fieldset className="form-group">
                  <label htmlFor="newTalkDescription">Description</label>
                  <textarea id="newTalkDescription" className="form-control" rows="3"
                            valueLink={this.linkState('description')}
                            placeholder="A description of the size of a tweet." maxLength="140"/>
                </fieldset>

                <fieldset className="form-group">
                  <label htmlFor="newTalkDate">Date*</label>
                  <Datetime value={this.state.date} onChange={this.dateChanged}
                            inputProps={{readOnly:true, required:true, placeholder: 'When?'}}
                            isValidDate={this.isValidDate}/>
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
                             handleDrag={this.handleDrag}/>
                </fieldset>

                <fieldset className="form-group">
                  <label htmlFor="newTalkZoomlink">Zoom Link</label>
                  <input id="newTalkZoomLink" className="form-control" type="text"
                         valueLink={this.linkState('zoomLink')} placeholder="Zoom link for the talk"/>
                </fieldset>

                <fieldset className="form-group">
                  <label htmlFor="newTalkAuthor">Author*</label>
                  <input id="newTalkAuthor" className="form-control" type="text" valueLink={this.linkState('author')}
                         placeholder="Who's the author?" required/>
                </fieldset>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.saveChanges}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
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

  saveChanges(){
    //ToDo Topic not found?
    let topics = this.state.talkTopics.map(topic => TopicsStore.findByName(topic.text));
    TalkActions.edit(this.state.id, {title: this.state.title, description: this.state.description, talkTopics: topics, date: this.state.date.toISOString(), zoomLink: this.state.zoomLink, author: this.state.author});
    this.hide();
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
