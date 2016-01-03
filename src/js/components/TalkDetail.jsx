import React from 'react';

export default class TalkDetailComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      talk: {}
    };
  }

  render() {

    return (
      <div>
        <h3>{this.state.talk.name}</h3>



      </div>
    )
  }
};
