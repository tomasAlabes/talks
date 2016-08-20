import React from 'react';
import Register from './register'
import Login from './login'
import UsersStore from '../stores/UsersStore'
import UserActions from '../actions/UserActions'

const getCurrentUser = function(){

  return {user:UsersStore.getCurrentUser()}

};

export default React.createClass({
   getInitialState(){
       return getCurrentUser();
   },

   componentDidMount: function () {
       UsersStore.addChangeListener(this._onChange);
   },

   componentWillUnmount: function () {
       UsersStore.removeChangeListener(this._onChange);
   },

  render() {
    return (
      <div>
        <nav className="navbar navbar-default " role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">{this.getName()}</a>
            </div>
        	<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">

                {this.getButtons()}

              </ul>
            </div>
        </div>
        </nav>
      </div>
    )
  },

  registerUser(){
      this.refs.registerModal.show();
  },

  loginUser(){
        this.refs.loginModal.show();
  },

  logoutUser(){
          UserActions.logout();
  },

  getButtons() {
           let buttons = [];
           if(this.state.user === null){
                buttons.push(<li><button  className="btn btn-default" onClick={this.registerUser}>Sign Up</button></li>);
                buttons.push(<li><button  className="btn btn-success" onClick={this.loginUser}>Sign In</button></li>);
                buttons.push(<Register ref="registerModal"  />);
                buttons.push(<Login ref="loginModal"  />);
           }
           else{
                buttons.push(<li><button  className="btn btn-success" onClick={this.logoutUser}>Logout</button></li>);
           }
          return buttons;
   },

   getName() {
              let buttons = [];
              if(this.state.user === null){
                   buttons.push('Welcome');
              }
              else{
                   let username = this.state.user.name;
                   buttons.push('Hello ' + username);
              }
             return buttons;
    },

   _onChange: function () {
       this.setState(getCurrentUser());
     }

});
