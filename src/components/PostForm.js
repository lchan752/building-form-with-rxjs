import React from 'react'

export default function PostForm(props) {
  const { form, error, loading, onSubmit } = props
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input type='text' {...form.register("title")}></input>
      </div>
      <div>
        <label>Body</label>
        <textarea {...form.register("body")}></textarea>
      </div>
      {error ? <p>{error}</p> : null}
      <input
        type='submit'
        disabled={loading}
        value={loading ? 'Please Wait ...' : 'Submit'}>
      </input>
    </form>
  )
}