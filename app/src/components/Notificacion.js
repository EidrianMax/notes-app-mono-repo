export default function Notificaion ({ message }) {
  if (message === null) {
    return null
  }

  return <div className='error'>{message}</div>
}
