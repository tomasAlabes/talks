import React from 'react';
import TopicsStore from '../stores/TopicsStore';
import TopicActions from '../actions/TopicActions';

const getTopicsState = function(){
  return {
    topics: TopicsStore.getAll()
  };
};

export default React.createClass({

  getInitialState: function() {
    return getTopicsState();
  },

  componentDidMount: function() {
    TopicsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TopicsStore.removeChangeListener(this._onChange);
  },

  render() {

    return (
      <ul className="list-group">
        {this.generateTopics()}
      </ul>
    )
  },

  generateTopics(){
    let topicsToRender = [];
    for (let topic of this.state.topics.values()) {
      topicsToRender.push(<TopicItem topic={topic} key={topic.id}/>);
    }
    return topicsToRender;
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTopicsState());
  }

});

const TopicItem = React.createClass({

  getInitialState: function() {
    return {
      topic: this.props.topic
    };
  },

  componentDidMount: function() {
    TopicsStore.addChangeListener(this._onChange);
  },

  render() {

    return (<li className="list-group-item">
      {this.state.topic.name}
        <span className="label label-default label-pill pull-xs-right">
          {this.state.topic.likes}
        </span>
      <button className="pull-xs-right" onClick={this.likeTopic}> Like! </button>
    </li>)

  },

  likeTopic() {
    TopicActions.like(this.state.topic.id);
  },

  _onChange: function() {
    this.setState({topic: TopicsStore.getTopic(this.state.topic.id)});
  }

});


