import React from 'react'
import { 
  useForm 
} from 'react-hook-form'

export default function CreateForm() {
  /**
   * Using react-hook-forms
   * input values and errors of each form field is binded to this form object
   * For more details, check https://react-hook-form.com/
   */
  const form = useForm()
  
  /**
   * The "error" state variable to store any errors when submitting the form
   * The "loading" state variable to indicate if the submit is in progress
   */
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  /**
   * This function is called when SUBMIT is clicked
   * The "data" field holds the submitted form input values.
   * We'll implement this later in the business logic section.
   */
  function onCreate(data) {

  }
  
  /**
   * Drawing the form
   */
  return (
    <form onSubmit={form.handleSubmit(onCreate)}>
      <h4>Create Article</h4>
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