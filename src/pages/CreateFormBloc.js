import { Subject, mapTo, merge, of, startWith, switchMap, share, filter } from "rxjs";
import { fromFetch } from 'rxjs/fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default class CreateFormBloc {
  constructor() {
    this.formData = new Subject();

    this.createPost = this.formData.pipe(
      switchMap(data => {
        const url = `${BASE_URL}/posts`
        const payload = { method: 'POST', body: JSON.stringify(data) }
        return fromFetch(url, payload)
      }),
      switchMap(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          return of(new Error('Error Occurred when creating post'))
        }
      }),
      share()
    )

    this.createPostSuccess = this.createPost.pipe(
      filter(resp => !(resp instanceof Error))
    )

    this.createPostFailed = this.createPost.pipe(
      filter(resp => resp instanceof Error)
    )

    this.createPostInProgress = merge(
      this.formData.pipe(mapTo(true)),
      this.createPost.pipe(mapTo(false)),
    ).pipe(
      startWith(false),
    )
  }
}