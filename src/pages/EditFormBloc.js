import { of, Subject, switchMap, withLatestFrom, share, filter, merge, mapTo, startWith } from "rxjs";
import { fromFetch } from 'rxjs/fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default class EditFormBloc {
  constructor() {
    this.formData = new Subject()

    this.postID = new Subject()

    this.initialFormData = this.postID.pipe(
      switchMap(postID => fromFetch(`${BASE_URL}/posts/${postID}`)),
      switchMap(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          return of(new Error('Error fetching Post'))
        }
      }),
    )

    this.updatePost = this.formData.pipe(
      withLatestFrom(this.postID),
      switchMap(([data, postID]) => {
        const url = `${BASE_URL}/posts/${postID}`
        const payload = { method: 'PUT', body: JSON.stringify(data) }
        return fromFetch(url, payload)
      }),
      switchMap(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          return of(new Error('Error updating Post'))
        }
      }),
      share(),
    )

    this.updatePostSuccess = this.updatePost.pipe(
      filter(resp => !(resp instanceof Error))
    )

    this.updatePostFailed = this.updatePost.pipe(
      filter(resp => resp instanceof Error)
    )

    this.updatePostInProgress = merge(
      this.formData.pipe(mapTo(true)),
      this.updatePost.pipe(mapTo(false)),
    ).pipe(
      startWith(false),
    )
  }
}