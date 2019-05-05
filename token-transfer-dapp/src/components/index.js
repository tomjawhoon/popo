import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
//import Tester from './Tester';
import {Router,Route,Link,browserHistory} from 'react-router';
const render = (Component) => {
    ReactDOM.render(
        // <Router history = {browserHistory}>
        // <Route path="/" component = {Home}/>
        // <Route path="/tester" component = {Tester}/>
        // </Router>,document.getElementById('root'),
        <Component />,
        document.getElementById('root'),
    );
};

export default render(Home);
