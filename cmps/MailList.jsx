const { useState, useEffect } = React
import { MailPreview } from "MailPreview.jsx"

export function MailList({ loadingClass, mails, onOpenMail, onStar, onRemove }) {

    const [initialMails, setMails] = useState(mails)

    useEffect(() => {
        setMails(initialMails)
    }, [initialMails])

    if (!mails.length) return <div>No Mails To Show...</div>

    return (
        <section className="mail-display-section container">
            <ul className="mail-list">
                {
                    mails.map(mail => (
                        <li className={loadingClass} key={mail.id} >
                            <MailPreview mail={mail}
                                onOpenMail={onOpenMail}
                                onStar={onStar}
                                onRemove={onRemove}/>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}
