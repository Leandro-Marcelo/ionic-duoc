import { Component, OnInit } from '@angular/core';
import { Post } from '../utils/interfacesAndTypes';
import { PostsService } from '../services/posts/posts.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorePostService } from '../store/posts/store-post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private storePost: StorePostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe(
      (posts) => {
        this.storePost.setPosts(posts);
      },
      (err) => {
        console.error('Error:', err);
      }
    );

    this.storePost.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {}

  createPost() {
    this.router.navigate(['/post-edit']);
  }

  viewPost(id: string) {
    this.router.navigate(['/post-edit', id]);
  }
}
