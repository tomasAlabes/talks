import React from 'react';
import TalkStore from '../stores/TalksStore';
import NextTalksItem from './NextTalksItem'

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
        <h3 className="nextTalks__header">Next Talks</h3>
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
      talksToRender.push(<NextTalksItem talk={talk} key={talk.id} />);
    }

    if (talksToRender.length === 0){
      return <p>No Talks Yet.</p>;
    }else{
      return talksToRender;
    }

  },

  _onChange: function() {
    this.setState(TalkStore.getAll());
  }

});