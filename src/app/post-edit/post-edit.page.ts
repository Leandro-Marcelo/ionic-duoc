import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../services/posts/posts.service';
import { Post } from '../utils/interfacesAndTypes';
import { StorePostService } from '../store/posts/store-post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {

  postId = '';

  postForm: FormGroup;

  posts: Post[] = [];

  postsSelected: Post = {
    body: "",
    id:"",
    title: "",
    userId:""
  }

  constructor(
    private postsService: PostsService,
    private storePost: StorePostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  ngOnInit() {

    this.storePost.posts$.subscribe(posts => {
      this.posts = posts;
    });

    this.postId = this.route.snapshot.params['id'];
    if (this.postId) {
      const foundPost = this.posts.find((post) => post.id === this.postId);

      if (foundPost === undefined) {
        this.router.navigate(['/posts']);
        return;
      }

      console.log("FOUND POST")
      console.log(foundPost)

      this.postsSelected = foundPost;
      this.postForm.setValue({
        title: foundPost.title,
        body: foundPost.body
      });
    }



  }

  savePost() {
    console.log("ME EJECUTO")
    console.log("this.postForm.valid", this.postForm.valid)
    console.log("this.postForm.value", this.postForm.value)
    if (this.postForm.valid) {
      const postData: Post = this.postForm.value;
      if (this.postId) {
        this.postsService.updatePostById(this.postId, postData).subscribe((_) => {
          const updatedPost: Post = {...this.postsSelected, ...postData}
          this.storePost.updatePost(this.postId, updatedPost);
          this.router.navigate(['/posts']);

        });
      } else {
        this.postsService.createPost(postData).subscribe((createdPost) => {
          this.storePost.addPost(createdPost);
          this.router.navigate(['/posts']);
        });
      }
    }
  }
  
}
