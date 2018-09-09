import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './About';
import Home from './Home';
import FactForm from './FactForm';
import FactCheck from './FactCheck';
import User from './User';
import Topics from './Topics';
import TopicForm from './TopicForm';
import SingleTopic from './SingleTopic';
import TagForm from './TagForm';
import FactView from './FactView';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}>
            
          </Route>
          <Route path='/about' component={About}/>
          <Route path='/factForm' component={FactForm} />
          <Route path="/fc" component={FactCheck} />
          <Route path="/user" component={User} />
          <Route path="/topics/new" component={TopicForm} />
          <Route path="/topics" component={Topics} />
          <Route path="/topic/:id" component={SingleTopic} />
          <Route path="/topics/:id" component={FactView} />
          <Route path="/tagform" component={TagForm} />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;

