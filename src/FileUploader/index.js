import './style.css'

export const FileUploader = () => {
  const onInputChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <form method="post" action="#" id="#">
      <div class="form-group files">
        <label>Upload Your File </label>
        <input type="file"
               onChange = {onInputChange}
               class="form-control" 
               multiple="" />
      </div>

      <button>Submit</button>
    </form>
  )
}