import {Pipe, PipeTransform} from '@angular/core';
import {Post} from "../app.component";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(post: Post[], titleSearch: string, searchType: string): Post[] {
    if (!titleSearch.trim()) {
      return post
    } else {
      return post.filter(item => {
        let search
        if (searchType === 'title') {
          search = item.title
        } else {
          search = item.text
        }
        return search.toLowerCase().includes(titleSearch.toLowerCase())
      })
    }
  }
}
