import React from 'react';
import packageJSON from '../../package.json';
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
        <nav className="navbar navbar-dark bg-inverse">
          <a href="/" className="navbar-brand">Talks v{version}</a>
        </nav>

        <section>
          <div className="col-md-8">
            <NewTopic />

            <TopicsList topics={[new Topic({name:'Javascript'}), new Topic({name:'Angular'})]} />

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
