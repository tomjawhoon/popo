import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Test2 from './test2';
import {Router,Route,Link,browserHistory} from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    
    <Router history={browserHistory}>
    {/* <Route path ="/" component={App}/> */}
    <Route path ="/Login" component={Login}/>
    <Route path ="/Test2" component={Test2}/>
  
    </Router>,document.getElementById('root')
);

export default App;