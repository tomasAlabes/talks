import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import UserActions from '../actions/UserActions';
import UsersStore from '../stores/UsersStore';
import { WithContext as ReactTags } from 'react-tag-input';

export default React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState(){
    return {};
  },

  show() {
    $(this.refs.modal).modal();
  },
  hide() {
    $(this.refs.modal).modal('hide');
  },


  render() {
  
    return (
      <div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="editTalkModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div >
                <button type="button" className="close loginClose" data-dismiss="modal" aria-label="Close" ><span
                                aria-hidden="true">&times;</span></button>
                <form className="form-signin" onSubmit={this.loginUser}>
                               <h4 className="form-signin-heading">Please sign in</h4>
                               <hr  />
                               <label for="inputEmail" className="sr-only">Email address</label>
                               <input valueLink={this.linkState('emailid')} data-bind="value: emailaddr"  id="inputEmail" className="form-control" placeholder="Email address or GUID"  autofocus></input>
                               <label for="inputPassword" className="sr-only">Password</label>
                               <input valueLink={this.linkState('password')} data-bind="value: passwd" type="password"  id="inputPassword" className="form-control" placeholder="Password" ></input>
                               <div className="checkbox">
                                 <label>
                                   <input type="checkbox" value="remember-me"></input> Remember me
                                 </label>
                               </div>
                               <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

                             </form>
            </div>

          </div>
        </div>
      </div>
    )
  },

  loginUser(e){
        e.preventDefault();
        //ToDo Topic not found?
        let userByEmail = UsersStore.findUserByEmail(this.state.emailid);
        if(userByEmail == undefined){
            userByEmail = UsersStore.findUserByGuid(this.state.emailid);
        }
        if(userByEmail !== undefined){
            if(userByEmail.password === this.state.password){
                UserActions.login(userByEmail);
                this.hide();
            }
            else{
                alert("Wrong Password");
            }
        }
        else{
            alert("User not found");
        }
  }

});
