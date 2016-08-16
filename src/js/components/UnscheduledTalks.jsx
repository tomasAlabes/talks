import React from 'react';
import TalkStore from '../stores/TalksStore';
import NextTalksItem from './NextTalksItem'

export default React.createClass({
  
  getInitialState(){
    return {
      talks: TalkStore.getUnscheduledTalks()
    }
  },
  
  componentDidMount: function () {
    TalkStore.addChangeListener(this._onChange);
  },
  
  componentWillUnmount: function () {
    TalkStore.removeChangeListener(this._onChange);
  },
  
  render() {
    
    return (
      <div className="nextTalks">
        <h3 className="nextTalks__header">Unscheduled Talks</h3>
        <div className="list-group">
          {this.renderTalks()}
        </div>
      </div>
    )
  },
  
  renderTalks(){
    let talks = Array.from(this.state.talks.values());
    let talksToRender = [];
    for (let talk of talks) {
      talksToRender.push(<NextTalksItem talk={talk} key={talk.id}/>);
    }
    
    if (talksToRender.length === 0) {
      return <p>No Talks Yet.</p>;
    } else {
      return talksToRender;
    }
    
  },
  
  _onChange: function () {
    this.setState({talks:TalkStore.getUnscheduledTalks()});
  }
  
});