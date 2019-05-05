import React, { Component } from 'react';
import Blockies from 'react-blockies';
import jwtDecode from 'jwt-decode';
import firebase from 'firebase';
import { Button } from 'reactstrap';


// import Login from './Login/Login';
//import Login from 'Login';
class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
        tasks:
            [   {id: 0, name: '',}
            ]
        ,
        task: ''
    }


     let  config = {
      apiKey: "AIzaSyDPwR_Tlxe5MODIEPugWCnO_drEh6-4jjw",
      authDomain: "login-psu-final.firebaseapp.com",
      databaseURL: "https://login-psu-final.firebaseio.com",
      projectId: "login-psu-final",
      storageBucket: "login-psu-final.appspot.com",
      messagingSenderId: "152285332333"
    };

    if (firebase.apps.length === 0) firebase.initializeApp(config)

    console.log('firebase: ', firebase.database())
    console.log('firebase: ', firebase.app().name)

    let myapp = firebase.database().ref('/');
    let tasksChild = myapp.child('/')
    tasksChild.remove()
    // tasksChild.set({tasks: this.state.task})
    myapp.on('value', snapshot => {
        console.log('task0: ', snapshot.val())
    });
}

  state = {
    loading: false,
    user: null,
    username: '',
    publicAddress:''

  };
  
  componentWillMount() {
    const { auth: { accessToken } } = this.props;
    const { payload: { id } } = jwtDecode(accessToken);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(user => this.setState({ user }))
      .catch(window.alert);
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ username: value ,  publicAddress: ''});
  };

  handleSubmit = ({ target }) => {
    // let dbCon = firebase.database().ref('/');
    // dbCon.push({tasks: this.state.tasks});
      const { auth: { accessToken } } = this.props;
      const { payload: { publicAddress } } = jwtDecode(accessToken);

       let lastItem = this.state.tasks[this.state.tasks.length - 1]
       let newTask = {id: lastItem.id + 1, username: this.state.username ,publicAddress}
       this.setState({
           tasks: [...this.state.tasks, newTask]
       })

       let tasksChild = firebase.database()
           .ref('/')
           .child('/Login/Profile/' + lastItem.id)
       tasksChild.set(newTask)
           .then(() => console.log("Add successfully: "))
           .catch((err) => console.log("Remove failed: " + err))

    const { user, username } = this.state;
    this.setState({ loading: true });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
      body: JSON.stringify({ username }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    })
      .then(response => response.json())
      .then(user => this.setState({ loading: false, user }))
      .catch(err => {
        window.alert(err);
        this.setState({ loading: false });
      });
    

  };

  render() {
    const { auth: { accessToken }, onLoggedOut } = this.props;
    const { payload: { publicAddress } } = jwtDecode(accessToken);
    const { loading, user } = this.state;
    const username = user && user.username;
    return (
      <div className="Profile">
        {/* <p>
          Logged in as <Blockies seed={publicAddress} />
        </p> */}
        <div>
          My username is {username ? <pre>{username}</pre> : 'not set.'}
           My publicAddress is <pre>{publicAddress}</pre>
        </div>
        <div>
          <label htmlFor="username">Change username: </label>
          <input name="username" onChange={this.handleChange} />
            <Button outline color="primary"  disabled={loading} onClick={this.handleSubmit}>Submit</Button>
        </div>
        <br></br>
        <p>
        <Button outline color="primary" size="lg" onClick={onLoggedOut}>Logout</Button> <Button outline color="primary"size="lg"><a href="http://localhost:8080/">TRANFER</a></Button>{' '}
        </p>
        <div>
    
         {/* <button><a href="#">TRANFER</a></button> */}
        </div>
      </div>
    );
  }
}

export default Profile;
