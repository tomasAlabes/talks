import React from 'react';
import TopicsStore from '../stores/TopicsStore';
import TopicActions from '../actions/TopicActions';
import { BarChart } from 'react-d3-components';

const getTopicsState = function(){
  return {
    topics: TopicsStore.getAll()
  };
};

const getChartData = function(){
  let values = Array.from(TopicsStore.getAll().values()).map(topic => {
    return {x: topic.text, y: topic.likes};
  });

  return [{
    label: 'Topics',
    values: values
  }];

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
    let chartData = getChartData();
    let chart;
    if (chartData[0].values.length === 0){
      chart = <span> No Topics Yet </span>
    } else {
      chart = <BarChart
        className="col-sm-6"
        data={chartData}
        width={400}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}} />
    }

    return (
      <div className="topicsContainer">
        <ul className="list-group topicList col-sm-5">
          {this.generateTopics()}
        </ul>
        {chart}
      </div>
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
      <img src="src/images/like.svg" className="pull-xs-right topicList__likeImg" onClick={this.likeTopic} alt="Like" />
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


