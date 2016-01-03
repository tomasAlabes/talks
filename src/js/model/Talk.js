import momentjs from 'moment'
import _ from 'underscore';

export default class Talk {

  constructor({title, description, talkTopics, date}){
    this.title = title;
    this.description = description;
    this.talkTopics = talkTopics;
    this.date = _.isObject(date) ? date.toISOString() : date;
  }

  get moment(){
    return momentjs(this.date);
  }

  set uploadUrl(url){
    this._uploadUrl = url;
  }

}
