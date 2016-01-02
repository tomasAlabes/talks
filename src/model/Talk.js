export default class Talk {

  constructor({id, title, description, topics, date}){
    this.id = id;
    this.title = title;
    this.description = description;
    this.talkTopics = topics;
    this.date = date;
  }

  set uploadUrl(url){
    this._uploadUrl = url;
  }

}
