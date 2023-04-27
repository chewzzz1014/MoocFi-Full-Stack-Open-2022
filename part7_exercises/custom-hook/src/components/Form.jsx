import useField from "../custom-hook/useField"

function Form() {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <h1>Form</h1>
      <form>
        name:
        <input 
            type={name.type}
            value={name.value}
            onChange={name.onChange}
        />
        <br />

        birthdate:
        <input
            type={born.type}
            value={born.value}
            onChange={name.onChange}
        />
        <br />

        height
        <input 
            type={height.type}
            value={height.value}
            onChange={height.onChange}
        />
      </form>
    </div>
  )
}

export default Form
