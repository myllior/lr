import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from "rxjs/operators";

export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Todo[] = [];
  namePost = '';
  flagLoad = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadPost()
  }

  addPost() {
    if (!this.namePost.trim()) {
      return
    }
    const post: Todo = {title: this.namePost, completed: false}
    this.http.post('https://jsonplaceholder.typicode.com/todos/', post)
      .pipe(delay(1000))
      .subscribe(res => {
        console.log(res)
        this.posts.unshift(post)
      });
  }

  loadPost() {
    // this.flagLoad = true;
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(delay(1500))
      .subscribe(response => {
        console.log(response)
        this.posts = response.sort(this.sort);
        this.flagLoad = true;
        // this.flagLoad = false;
      });
  }

  completedPost(id: number) {
    return this.http.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {completed: true})
      .subscribe((res: Todo) => {
        this.posts.find(item => item.id === res.id).completed = true
      })
  }

  removePost(id: number) {
    this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).subscribe(() => {
      console.log(id)
      this.posts = this.posts.filter(item => item.id != id)
      console.log(this.posts)
    });
  }

  sort(a: Todo, b: Todo): number {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }
}
