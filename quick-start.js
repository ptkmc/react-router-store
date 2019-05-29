import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const gradient = { background: 'linear-gradient(180deg,#7c69f4,#5546f2)' };

const Home = () => (
  <div style={gradient}>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }) => {
  return <h3>{match.params.topicId}</h3>;
};

const Topics = ({ match }) => {
  console.log(match);
  return (
    <div>
      <h2>Topics</h2>
      <Route
        exact
        path={match.url}
        render={() => <h3>Please select a topic</h3>}
      />
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to="/topics/components">Components</Link>
        </li>
        <li>
          <Link to="/topics/props-v-state">Props v. State</Link>
        </li>
      </ul>

      <Route path="/topics/:topicId" component={Topic} />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </div>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </Router>
    );
  }
}

export default App;
