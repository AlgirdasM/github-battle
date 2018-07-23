import React, { Component } from 'react';
import Popular from './Popular'
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
    	<BrowserRouter>
			<div className="container">
				<Route path='/popular' component={Popular} />
			</div>
		</BrowserRouter>
    );
  }
}

export default App;
