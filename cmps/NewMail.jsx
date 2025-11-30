const { useState } = React

export function NewMail({ onClose, onSend }) {

  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  function onCloseCompose(ev) {
    ev.stopPropagation()
    onClose()
  }

  function onMinimize(ev) {
    ev.stopPropagation()
    setIsMinimized(prev => !prev)
  }

  function onSendEmail() {
    onSend(to, subject, body)
      .then(() => {
        setTo('')
        setSubject('')
        setBody('')
        onClose()
      })
      .catch(() => {
        alert('Could not send email')
      });
  }

  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <section className={`compose-window ${isMinimized ? "minimized" : ""}`}
      title="Minimize">
      <header className="compose-header"
        onClick={() => setIsMinimized(prev => !prev)}>
        <span>New Message</span>

        <div className="compose-actions">
          <button >–</button>
          {/* <button className="expand"
            title="Full screen">⤢</button> */}
          <button onClick={(ev) => onCloseCompose(ev)}
            title="Close">✕</button>
        </div>
      </header>

      {!isMinimized && (
        <div className="compose-body">

          <input type="text" placeholder="Recipients"
            value={to}
            onInput={(ev) => setTo(ev.target.value)} />

          <input type="text" placeholder="Subject"
            value={subject}
            onChange={(ev) => setSubject(ev.target.value)} />

          <textarea
            value={body}
            onChange={(ev) => setBody(ev.target.value)}>
          </textarea>
        </div>)}

      {!isMinimized && (
        <footer className="compose-footer">

          <button className="send" title="Send"
            onClick={onSendEmail}>
            Send
          </button>

          <button className="delete trash-btn"
            title="Discard draft">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </footer>
      )}
    </section>
  )
}
