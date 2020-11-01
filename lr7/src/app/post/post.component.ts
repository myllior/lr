import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {Post, PostsService} from "../posts.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post

  constructor(private router: ActivatedRoute, private postS: PostsService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      this.post = this.postS.getById(+param.id)
    })
  }
}
