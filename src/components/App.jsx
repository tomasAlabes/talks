import React from 'react';
import packageJSON from '../../package.json';
import NewTalk from './NewTalk'

export default class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const version = packageJSON.version;

    return (
      <div>
        <nav className="navbar navbar-dark bg-inverse">
          <a href="/" className="navbar-brand">Talks v{version}</a>
        </nav>

        <section>
          <NewTalk />
        </section>

      </div>
    )
  }
};
