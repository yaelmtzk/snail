import { utilService } from "/services/util.service.js"

export function MailDetails({ mail, onBack }) {

    if (!mail) return <div>Loading...</div>

    const { name, sentAt, subject, body, from } = mail

    const year = new Date(sentAt).getFullYear()
    const hours = new Date(sentAt).getHours()
    const min = new Date(sentAt).getMinutes()

    return (
        <section className="mail-details-container">
            <div className="actions-btns">
                <button className="go-back-btn"
                title="Back to Inbox"
                onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
            </div>
            <div className="mail-subject">{subject}</div>

            <div className="mail-main">
                <div className="avatar-container">
                    <img src="./assets/img/avatar.png" 
                    alt="Sender picture" className="avatar" />
                </div>

                <div className="mail-details-box">

                    <div className="mail-details-header">

                        <div className="sender-details">
                                <div className="sender-name">{name}</div>
                                <div className="sender-mail">&lt;{from}&gt;</div>                                
                        </div>

                        <time className="mail-date" dateTime=""> 
                            {`${utilService.getShortDate(sentAt)} 
                            ${year}, ${hours}:${utilService.padNum(min)}`}
                            </time>
                    </div>

                    <article className="mail-body">{body}</article>

                </div>
            </div>
        </section>
    )
}
