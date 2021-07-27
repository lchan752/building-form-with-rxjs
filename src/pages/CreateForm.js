import React from 'react'
import { useForm } from 'react-hook-form'
import { Subscription } from 'rxjs'
import CreateFormBloc from './CreateFormBloc'
import PostForm from 'components/PostForm'

export default function CreateForm() {
  const [bloc] = React.useState(new CreateFormBloc())
  const form = useForm()
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  

  React.useEffect(() => {
    const sub = new Subscription()
    sub.add(bloc.createPostSuccess.subscribe(_ => alert('Post Created Successfully!')))
    sub.add(bloc.createPostFailed.subscribe(err => setError(err.message)))
    sub.add(bloc.createPostInProgress.subscribe(setLoading))
    return () => sub.unsubscribe()
  }, [])

  function onCreate(data) {
    bloc.formData.next(data)
  }
  
  return (
    <React.Fragment>
      <h4>Create Post</h4>
      <PostForm
        form={form}
        error={error}
        loading={loading}
        onSubmit={onCreate}>
      </PostForm>
    </React.Fragment>
  )
}