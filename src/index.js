import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import './index.css';
import App from './App';
import Home from './components/Home';
import Game from './components/Game';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="game/:id" component={Game}/>
      <Route path="home" component={Home}/>
      <Route path="*" component={Home} />
    </Route>
  </Router>
), document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
