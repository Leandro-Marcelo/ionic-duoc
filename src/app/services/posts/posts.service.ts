import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, retry, throwError } from 'rxjs';
import { Post, PostAction } from 'src/app/utils/interfacesAndTypes';
import { v4 as uuidV4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl: string = 'https://jsonplaceholder.typicode.com';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private postsUpdated = new Subject<Post[]>();
  public postsUpdated$ = this.postsUpdated.asObservable();

  private createdOrUpdatedPost = new Subject<PostAction>();
  public createdOrUpdatedPost$ = this.createdOrUpdatedPost.asObservable();

  constructor(private httpClient: HttpClient) { }

  // REDUX OR REDUCER DJAKSDJAKJ

  updatePostsList(posts: Post[]) {
    this.postsUpdated.next(posts);
  }

  sendCreatedOrUpdatedPost(action: PostAction) {
    this.createdOrUpdatedPost.next(action);
  }


  // CRUD

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/posts`, this.httpOptions)
      .pipe(
        retry(2),
        map((posts) => {
          return posts.map((post) => {
            return { ...post, id: String(post.id), userId: String(post.userId) };
          });
        }),
        catchError(this.handleError)
      );
  }

  createPost(data: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this.baseUrl}/posts`, data, this.httpOptions)
      .pipe(
        retry(2),
        map((createdPost) => {
          return { ...data, id: uuidV4() };
        }),
        catchError(this.handleError)
      );
  }

  getPostById(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/posts/1`, this.httpOptions)
      .pipe(
        retry(2),
        map((foundPost) => {
          return foundPost;
        }),
        catchError(this.handleError)
      );
  }

  updatePostById(id: string, data: Post): Observable<Post> {
    return this.httpClient.put<Post>(`${this.baseUrl}/posts/1`, data, this.httpOptions)
      .pipe(
        retry(2),
        map((updatedPost) => {
          return updatedPost
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something went wrong. Please try again.');
  }
}
