import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import TalkActions from '../actions/TalkActions';
import UserActions from '../actions/UserActions';
import TopicsStore from '../stores/TopicsStore';
import Datetime from 'react-datetime';
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

            <div className="">
                <div className="">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                        	<div className="panel panel-default">
                        		<div className="panel-heading customizePanelHeading">
                			    		<h2 className="panel-title pull-left">Please sign up for Talks <small>It's free!</small></h2>
                			    		<button type="button" className="close pull-right" data-dismiss="modal" aria-label="Close"><span
                                                        aria-hidden="true">&times;</span></button>
                                        <div class="clearfix"></div>
                			 			</div>
                			 			<div className="panel-body">
                			    		<form role="form" onSubmit={this.createUser}>
                			    			<div className="row">
                			    				<div className="col-xs-6 col-sm-6 col-md-6">
                			    					<div className="form-group">
                			                <input  valueLink={this.linkState('name')} type="text" name="first_name" id="first_name" className="form-control input-sm" placeholder="User Name"></input>
                			    					</div>
                			    				</div>
                			    				<div className="col-xs-6 col-sm-6 col-md-6">
                			    					<div className="form-group">
                			    						<input  valueLink={this.linkState('guid')} type="text" name="last_name" id="last_name" className="form-control input-sm" placeholder="GUID"></input>
                			    					</div>
                			    				</div>
                			    			</div>

                			    			<div className="form-group">
                			    				<input  valueLink={this.linkState('emailid')} type="email" name="email" id="email" className="form-control input-sm" placeholder="Email Address"></input>
                			    			</div>

                			    			<div className="row">
                			    				<div className="col-xs-6 col-sm-6 col-md-6">
                			    					<div className="form-group">
                			    						<input  valueLink={this.linkState('password')} type="password" name="password" id="password" className="form-control input-sm" placeholder="Password"></input>
                			    					</div>
                			    				</div>
                			    				<div className="col-xs-6 col-sm-6 col-md-6">
                			    					<div className="form-group">
                			    						<input data-bind="value: newpasswd" type="password" name="password_confirmation" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password"></input>
                			    					</div>
                			    				</div>
                			    			</div>

                			    			<input type="submit" value="Register" className="btn btn-info btn-block"></input>

                			    		</form>
                			    	</div>
                	    		</div>
                    		</div>
                    	</div>
            </div>

          </div>
        </div>
      </div>
    )
  },



  createUser(e){
      e.preventDefault();
      //ToDo Topic not found?
      //let topics = this.state.talkTopics.map(topic => TopicsStore.findByName(topic.text));
      let userProps = {name: this.state.name, guid: this.state.guid,  emailid: this.state.emailid, password: this.state.password};
      let topicName = this.getAllTopics().map(topic => topic.text);
      userProps.topics = topicName;
      UserActions.create(userProps);

      this.setState({name: '', guid: '',  emailid: '', password: ''});
      this.hide();
  },
  


  getStoreTopicsNames() {
    return this.getAllTopics().map(topic => topic.text);
  },



  getAllTopics(){
    return Array.from(TopicsStore.getAll().values());
  }

});
