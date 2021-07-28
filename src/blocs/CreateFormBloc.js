import { has } from "lodash";
import { Subject, mapTo, merge, of, startWith, switchMap, share, filter } from "rxjs";
import { fromFetch } from 'rxjs/fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default class CreateFormBloc {
  get formData() {
    if (!has(this, '_formData')) {
      this._formData = new Subject()
    }
    return this._formData
  }
  get createPost() {
    if (!has(this, '_createPost')) {
      this._createPost = this.formData.pipe(
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
    }
    return this._createPost
  }
  get createPostSuccess() {
    if (!has(this, '_createPostSuccess')) {
      this._createPostSuccess = this.createPost.pipe(
        filter(resp => !(resp instanceof Error))
      )
    }
    return this._createPostSuccess
  }
  get createPostFailed() {
    if (!has(this, '_createPostFailed')) {
      this._createPostFailed = this.createPost.pipe(
        filter(resp => resp instanceof Error)
      )
    }
    return this._createPostFailed
  }
  get createPostInProgress() {
    if (!has(this, '_createPostInProgress')) {
      this._createPostInProgress = merge(
        this.formData.pipe(mapTo(true)),
        this.createPost.pipe(mapTo(false)),
      ).pipe(
        startWith(false),
      )
    }
    return this._createPostInProgress
  }
}