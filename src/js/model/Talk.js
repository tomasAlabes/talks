import momentjs from 'moment'
import _ from 'underscore';

export default class Talk {

  constructor({title, description = '', talkTopics = [], date, zoomLink = ''}){
    this.title = title;
    this.description = description;
    this.talkTopics = talkTopics;
    this.date = _.isObject(date) ? date.toISOString() : date;
    this.zoomLink = zoomLink;
  }

  get moment(){
    return momentjs(this.date);
  }

}
