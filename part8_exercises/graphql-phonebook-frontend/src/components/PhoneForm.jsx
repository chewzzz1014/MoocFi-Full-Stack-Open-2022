import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_NUMBER } from "../queries"

function PhoneForm({setError}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  const submit = (event) => {
    event.preventDefault()
    changeNumber({variables: {name, phone}})

    setName('')
    setPhone('')
  }

  // generate error msg when attempting to change phone number for user that doesn't exist
  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
        setError('person not found')
    }
  }, [result.data, setError]) // eslint-disable-line

  return (
    <div>
        <h2>change number</h2>

        <form onSubmit={submit}>
            <div>
                name <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                phone <input
                    value={phone}
                      onChange={({ target }) => setPhone(target.value)}
                />
            </div>
            <button type='submit'>change number</button>
        </form>
    </div>
  )
}

export default PhoneForm
