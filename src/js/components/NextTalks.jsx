import React from 'react';
import TalkStore from '../stores/TalksStore';

export default React.createClass({

  getInitialState(){
    return {
      talks: TalkStore.getAll()
    }
  },

  componentDidMount: function() {
    TalkStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TalkStore.removeChangeListener(this._onChange);
  },

  render() {

    return (
      <div className="nextTalks">
        <h2>Next Talks</h2>
        <div className="list-group">
          {this.renderTalks()}
        </div>
      </div>
    )
  },

  renderTalks(){
    let talks = Array.from(this.state.talks.values());
    //filter the past ones
    //order them by date
    let orderedTalks = talks
      .filter(talk => talk.moment.isAfter(new Date()))
      .sort((talk1, talk2) => {
        if (talk1.moment.isBefore(talk2.moment)) {
          return -1;
        } else if (talk1.moment.isAfter(talk2.moment)) {
          return 1;
        } else {
          return 0;
        }

      });

    let talksToRender = [];
    for (let talk of orderedTalks) {
      talksToRender.push(<TalkItem talk={talk} key={talk.id} />);
    }
    return talksToRender;
  },

  _onChange: function() {
    this.setState(TalkStore.getAll());
  }

});

const TalkItem = React.createClass({

  getInitialState(){
    return {
      talk: this.props.talk
    }

  },

  render(){
    let talk = this.state.talk;

    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">
          {talk.title}
        </h4>
        <p className="list-group-item-text">
          {talk.description}
        </p>
        <p className="list-group-item-text">
          {talk.talkTopics.map(topic => topic.text).join(', ')}
        </p>
        <p className="list-group-item-text">
          {talk.moment.fromNow()}
        </p>
      </div>
    );
  },

  componentDidMount: function() {
    TalkStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TalkStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    let talk = TalkStore.getTalk(this.state.talk.id);
    if (talk !== undefined) { //has been deleted?
      this.setState({talk: talk});
    }
  }

});