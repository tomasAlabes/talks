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

const onresizeHandler = function(){
  this.setState({
    barChartWidth: this.refs.barChartContainer.offsetWidth
  })
};

export default React.createClass({

  getInitialState: function() {
    return getTopicsState();
  },

  componentDidMount: function() {
    TopicsStore.addChangeListener(this._onChange);
    window.onresize = onresizeHandler.bind(this);
  },

  componentWillUnmount: function() {
    TopicsStore.removeChangeListener(this._onChange);
    window.removeEventListener('resize', onresizeHandler);
  },

  render() {
    let chartData = getChartData();
    let chart;
    if (chartData[0].values.length === 0){
      chart = <span> No Topics Yet </span>
    } else {
      chart = <BarChart
        data={chartData}
        width={this.refs.barChartContainer.offsetWidth}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}} />
    }

    return (
      <div className="topicsContainer">
        <ul className="list-group topicList col-lg-3">
          {this.generateTopics()}
        </ul>
        <div ref="barChartContainer" className="col-lg-9">
          {chart}
        </div>
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
        <span className="badge">
          {this.state.topic.likes}
        </span>
      <img src="src/images/like.svg" className="topicList__likeImg" onClick={this.likeTopic} alt="Like" />
      <img src="src/images/dislike.svg" className="topicList__likeImg" onClick={this.dislikeTopic} alt="Dislike" />
    </li>)

  },

  likeTopic() {
    TopicActions.like(this.state.topic.id);
  },

  dislikeTopic() {
    TopicActions.dislike(this.state.topic.id);
  },

  _onChange: function() {
    let topic = TopicsStore.getTopic(this.state.topic.id);
    if (topic !== undefined) { //has been deleted?
      this.setState({topic: topic});
    }
  }

});


