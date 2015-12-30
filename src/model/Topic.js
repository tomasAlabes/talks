export default class Topic {

  constructor({id, name, likes = 0}) {
    this.id = id;
    this.name = name;
    this.likes = likes;
  }

  addLike() {
    this.likes++;
  }

  removeLike() {
    this.likes--;
  }

}
