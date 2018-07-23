import React, { Component } from 'react';
import Popular from './Popular';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';

class App extends Component {
  render() {
    return (
    	<BrowserRouter>
			<div className="container">
				<Nav />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/battle' component={Battle} />
					<Route path='/popular' component={Popular} />
					<Route render={function () {
						return <p>Not Found</p>
					}} />
				</Switch>
			</div>
		</BrowserRouter>
    );
  }
}

export default App;
