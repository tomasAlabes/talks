import React from 'react';
import packageJSON from '../../../package.json';
import NewTalk from './NewTalk'
import NewTopic from './NewTopic'
import NextTalks from './NextTalks'
import TopicsList from './TopicsList'
import Topic from '../model/Topic'

export default React.createClass({

  render() {
    const version = packageJSON.version;

    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">Talks</h1>
          <p className="lead">Web App to vote for subjects and plan talks for them.</p>
        </div>

          <section>
          <div className="col-md-8">
            <NewTopic />

            <TopicsList />



            <hr/>
            <NewTalk />
          </div>
          <div className="col-md-4">
            <NextTalks />
          </div>
        </section>

      </div>
    )
  }
});