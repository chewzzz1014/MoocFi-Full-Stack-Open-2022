const Notification = (props) => {
  const { message } = props
  if (message === null) {
    return null
  }

  return (
    <div className={message.status}>
      {message.msg}
    </div>
  )
}

export default Notification