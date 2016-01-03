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

  componentWillUnmount: function() {
    TopicsStore.removeChangeListener(this._onChange);
  },

  render() {

    return (<li className="list-group-item">
      {this.state.topic.text}
        <span className="label label-default label-pill pull-xs-right">
          {this.state.topic.likes}
        </span>
      <img src="src/images/like.svg" className="pull-xs-right button--like" onClick={this.likeTopic} alt="Like" />
    </li>)

  },

  likeTopic() {
    TopicActions.like(this.state.topic.id);
  },

  _onChange: function() {
    let topic = TopicsStore.getTopic(this.state.topic.id);
    if (topic !== undefined) { //has been deleted?
      this.setState({topic: topic});
    }
  }

});


