import { has } from "lodash";
import { mix } from "mixwith";
import { of, Subject, switchMap, withLatestFrom, share, filter, merge, mapTo, startWith } from "rxjs";
import { fromFetch } from 'rxjs/fetch';
import FetchPostMixin from "blocs/FetchPostMixin";

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default class EditFormBloc extends mix(Object).with(FetchPostMixin) {
  get formData() {
    if (!has(this, '_formData')) {
      this._formData = new Subject()
    }
    return this._formData
  }

  get updatePost() {
    if (!has(this, '_updatePost')) {
      this._updatePost = this.formData.pipe(
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
    }
    return this._updatePost
  }

  get updatePostSuccess() {
    if (!has(this, '_updatePostSuccess')) {
      this._updatePostSuccess = this.updatePost.pipe(
        filter(resp => !(resp instanceof Error))
      )
    }
    return this._updatePostSuccess
  }

  get updatePostFailed() {
    if (!has(this, '_updatePostFailed')) {
      this._updatePostFailed = this.updatePost.pipe(
        filter(resp => resp instanceof Error)
      )
    }
    return this._updatePostFailed
  }

  get updatePostInProgress() {
    if (!has(this, '_updatePostInProgress')) {
      this._updatePostInProgress = merge(
        this.formData.pipe(mapTo(true)),
        this.updatePost.pipe(mapTo(false)),
      ).pipe(
        startWith(false),
      )
    }
    return this._updatePostInProgress
  }
}