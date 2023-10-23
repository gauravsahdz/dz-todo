import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment as config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url = `${config.baseUrl}/posts`;
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.url}`);
  }

  addPost(post: any) {
    return this.http.post(`${this.url}`, post);
  }

  deletePost(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  likePost(id: any) {
    return this.http.patch(`${this.url}/like/${id}`, {});
  }

  tweetPost(id: any) {
    return this.http.patch(`${this.url}/retweet/${id}`, {});
  }

  explorePosts(q: string) {
    return this.http.get(`https://twitter135.p.rapidapi.com/AutoComplete/?q=${q}`, {
      headers: {
        'x-rapidapi-key': 'ba9ab28b87msh5f22046c3df83c5p175ec3jsne797aa334207',
        'x-rapidapi-host': 'twitter135.p.rapidapi.com',
      },
    });
  }
}
