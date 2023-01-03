const Notification = (props) => {
  const { message } = props
  if (message === null) {
    return null
  }

  return (
    <div className={`${message.status === 'error' ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

export default Notification