export default class Talk {

  constructor({name, description, topics}){
    this.name = name;
    this.description = description;
    this.topics = topics;
  }

  set uploadUrl(url){
    this._uploadUrl = url;
  }

}
