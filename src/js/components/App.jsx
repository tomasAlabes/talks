import React from 'react';
import NewTalk from './NewTalk'
import NewTopic from './NewTopic'
import NextTalks from './NextTalks'
import UnscheduledTalks from './UnscheduledTalks'
import TopicsList from './TopicsList'

export default React.createClass({
  
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3">Talks</h1>
          <p className="lead">Vote for topics and plan talks for them.</p>
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
            <UnscheduledTalks />
          </div>
        </section>
      
      </div>
    )
  }
});
