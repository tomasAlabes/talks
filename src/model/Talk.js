export default class Talk {

  constructor({name, description, topics, date}){
    this.name = name;
    this.description = description;
    this.topics = topics;
    this.date = date;
  }

  set uploadUrl(url){
    this._uploadUrl = url;
  }

}
