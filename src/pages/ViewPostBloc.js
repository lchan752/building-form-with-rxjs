import { has } from "lodash";
import { of, Subject, switchMap } from "rxjs";
import { fromFetch } from 'rxjs/fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default class ViewPostBloc {
  get postID() {
    if (!has(this, '_postID')) {
      this._postID = new Subject()
    }
    return this._postID
  }
  get post() {
    if (!has(this, '_post')) {
      this._post = this.postID.pipe(
        switchMap(postID => fromFetch(`${BASE_URL}/posts/${postID}`)),
        switchMap(resp => {
          if (resp.ok) {
            return resp.json()
          } else {
            return of(new Error('Error fetching Post'))
          }
        }),
      )
    }
    return this._post
  }
}