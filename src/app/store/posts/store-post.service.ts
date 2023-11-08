import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/utils/interfacesAndTypes';

@Injectable({
  providedIn: 'root'
})
export class StorePostService {

  private _posts = new BehaviorSubject<Post[]>([]);
  readonly posts$ = this._posts.asObservable();

  constructor() { }

  setPosts(posts: Post[]) {
    this._posts.next(posts);
  }

  addPost(post: Post) {
    const currentPosts = this._posts.value;
    this._posts.next([post,...currentPosts]);
  }

  updatePost(postId: string, updatedPost: Post) {
    const currentPosts = this._posts.value;
    const updatedPosts = currentPosts.map(post =>
      post.id === postId ? updatedPost : post
    );
    this._posts.next(updatedPosts);
  }

  deletePost(postId: string) {
    const currentPosts = this._posts.value;
    const updatedPosts = currentPosts.filter(post => post.id !== postId);
    this._posts.next(updatedPosts);
  }
}
