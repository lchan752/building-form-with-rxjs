import { of, Subject, switchMap, share } from "rxjs";
import { fromFetch } from 'rxjs/fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default class ViewPostBloc {
  constructor() {
    this.postID = new Subject()

    this.post = this.postID.pipe(
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
}