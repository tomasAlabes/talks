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

  render() {

    return (
      <div>
        <h2>Next Talks</h2>
        {this.renderTalks()}
      </div>
    )
  },

  renderTalks(){
    let talkssToRender = [];
    for (let talk of this.state.talks.values()) {
      talkssToRender.push(<div>{talk.name}</div>);
    }
    return talkssToRender;
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(TalkStore.getAll());
  }

});
