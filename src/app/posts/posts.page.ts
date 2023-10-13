import { Component, OnInit } from '@angular/core';
import { Post } from '../utils/interfacesAndTypes';
import { PostsService } from '../services/posts/posts.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription();
  private createdOrUpdatedPostSub: Subscription = new Subscription();

  constructor(private postsService: PostsService, private router: Router) { }

  // ngOnInit() {
  //   this.postService.getPosts().subscribe((posts) => {
  //     this.posts = posts;
  //   }, (err) => {
  //     console.error('Error:', err);
  //   });
  // }

  ngOnInit() {
    // this.postsSub = this.postsService.postsUpdated$.subscribe((posts: Post[]) => {
    //   this.posts = posts;
    // });

    this.createdOrUpdatedPostSub = this.postsService.createdOrUpdatedPost$.subscribe((action) => {
      if (action.type === 'create') {
        this.posts = [action.payload, ...this.posts];
      } else if (action.type === 'update') {
        this.posts = this.posts.filter(post => post.id !== action.payload.id);
      }
    });

    // Carga inicial de los posts
    this.postsService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.postsService.updatePostsList(posts);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  createPost() {
    this.router.navigate(['/post-edit']);
  }
  
  viewPost(id: string) {
    this.router.navigate(['/post-edit', id]);
  }

}
