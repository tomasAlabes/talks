export default class Topic {

  constructor({text, likes = 0}) {
    this.text = text;
    this.likes = likes;
  }

  addLike() {
    this.likes++;
  }

  removeLike() {
    this.likes--;
  }

}
