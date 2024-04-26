import { makeAutoObservable } from "mobx";

export class PostsStore {
  currentPosts = null;
  constructor() {
    makeAutoObservable(this);
  }
  // установка текущего трека
  setCurentPost(track) {
    this.currentPosts = track;
  }
  // получение текущего трека
  getCurentPost() {
    return this.currentPosts;
  }
}

export const statePosts = new PostsStore();
