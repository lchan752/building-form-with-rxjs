import React from 'react'
import { useForm } from 'react-hook-form'
import { Subscription } from 'rxjs'
import PostForm from 'components/PostForm'
import EditFormBloc from 'blocs/EditFormBloc'
import { useRouteMatch } from 'react-router-dom'

export default function EditForm() {
  const form = useForm()
  const match = useRouteMatch()
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [bloc] = React.useState(new EditFormBloc())

  React.useEffect(() => {
    const sub = new Subscription()
    sub.add(bloc.updatePostSuccess.subscribe(_ => alert('Post Updated Successfully!')))
    sub.add(bloc.updatePostFailed.subscribe(err => setError(err.message)))
    sub.add(bloc.updatePostInProgress.subscribe(setLoading))
    sub.add(bloc.post.subscribe(post => {
      form.setValue('title', post.title, { shouldValidate: true, shouldDirty: false })
      form.setValue('body', post.body, { shouldValidate: true, shouldDirty: false })
    }))
    return () => sub.unsubscribe()
  }, [])

  React.useEffect(() => {
    bloc.postID.next(match.params.post_id)
  }, [])

  function onUpdate(data) {
    bloc.formData.next(data)
  }
  
  return (
    <React.Fragment>
      <h4>Edit Post</h4>
      <PostForm
        form={form}
        error={error}
        loading={loading}
        onSubmit={onUpdate}>
      </PostForm>
    </React.Fragment>
  )
}