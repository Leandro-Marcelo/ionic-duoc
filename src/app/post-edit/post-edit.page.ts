import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../services/posts/posts.service';
import { Post } from '../utils/interfacesAndTypes';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {

  postForm: FormGroup;
  postId: string = "";

  postSelected: Post = {
    body: "",
    id: "",
    title: "",
    userId: ""
  }

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.postForm = this.fb.group({
      userId: [1, [Validators.required]],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      body: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    if (this.postId) {
      this.postsService.getPostById(this.postId).subscribe(data => {
        this.postForm.setValue({
          userId: data.userId,
          title: data.title,
          body: data.body
        });
      });
    }
  }

  savePost() {
    if (this.postForm.valid) {
      const postData: Post = this.postForm.value;
      if (this.postId) {

        this.postsService.updatePostById(this.postId, postData).subscribe((_) => {
          this.router.navigate(['/posts']);
          // Obtener la lista actualizada y notificar el cambio
          //this.updateAndEmitPosts();
          const updatedPost: Post = {...postData, id: this.postId}
          this.postsService.sendCreatedOrUpdatedPost({ type: 'update', payload: updatedPost });
        });
      } else {
        this.postsService.createPost(postData).subscribe((createdPost) => {
          this.router.navigate(['/posts']);
          // Obtener la lista actualizada y notificar el cambio
          //this.updateAndEmitPosts();
          this.postsService.sendCreatedOrUpdatedPost({ type: 'create', payload: createdPost });
        });
      }
    }
  }
  
  // private updateAndEmitPosts() {
  //   this.postsService.getPosts().subscribe(posts => {
  //     this.postsService.updatePostsList(posts);
  //   });
  // }

}
