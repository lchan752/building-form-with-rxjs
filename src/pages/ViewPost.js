import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Subscription } from 'rxjs'
import ViewPostBloc from './ViewPostBloc'

export default function ViewPost() {
  const match = useRouteMatch()
  const [bloc] = React.useState(new ViewPostBloc())
  const [post, setPost] = React.useState()

  React.useEffect(() => {
    const sub = new Subscription()
    sub.add(bloc.post.subscribe(setPost))
    return () => sub.unsubscribe()
  }, [])

  React.useEffect(() => {
    bloc.postID.next(match.params.post_id)
  }, [])
  
  return (
    <React.Fragment>
      <h4>View Post</h4>
      {post ? (
        <dl>
          <dt>Title</dt>
          <dd>{ post.title }</dd>
          <dt>Body</dt>
          <dd>{ post.body }</dd>
        </dl>
      ) : (
        <p>Please Wait ...</p>
      )}
    </React.Fragment>
  )
}