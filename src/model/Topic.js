export default class Topic {

  constructor(name) {
    this.name = name;
    this.likes = 0;
  }

  addLike() {
    this.likes++;
  }

  removeLike() {
    this.likes--;
  }

}
