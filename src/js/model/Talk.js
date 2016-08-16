import momentjs from 'moment'
import _ from 'underscore';

export default class Talk {

  constructor({title, description = '', talkTopics = [], date = '', zoomLink = '', author, wikiLink = ''}){
    this.title = title;
    this.description = description;
    this.talkTopics = talkTopics;
    this.date = _.isObject(date) ? date.toISOString() : date;
    this.zoomLink = zoomLink;
    this.author = author;
    this.wikiLink = wikiLink;
  }

  get moment(){
    return this.date !== '' ? momentjs(this.date) : '';
  }

}
