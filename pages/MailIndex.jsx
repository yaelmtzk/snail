import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "MailDetails.jsx"
import { NewMail } from "../cmps/NewMail.jsx"
import { RightSideBar } from "../cmps/RightSideBar.jsx"
import { LeftSideBar } from "../cmps/LeftSideBar.jsx"

const { useState, useEffect } = React
const { useSearchParams, useNavigate } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [selectedMail, setSelectedMail] = useState(null)
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilter(newFilterBy) {
        setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
        setSelectedMail(null)
    }

    function onOpenMail(mailId) {
        setMails(mails =>
            mails.map(mail => mail.id === mailId ?
                { ...mail, isRead: true } : mail))

        mailService.markAsRead(mailId).catch(err => {
            console.error("Failed to mark as read:", err)
        })

        mailService.get(mailId).then(mail => {
            setSelectedMail(mail)
        })
            .catch(err => {
                console.error("Failed to load mail:", err);
            })

    }

    function onSendMail(toMail, mailSub, content) {
        const newMail = mailService.createMail(toMail, mailSub, content)
        
        return mailService.save(newMail)
        .then(() => {
            loadMails()
            return newMail
        })
        .catch(err => console.error('Failed to save mail:', err))
    }

    const handleStar = (mailId, newValue) => {
        console.log(newValue);

        setMails(prevMails => {
            const updated = prevMails.map(mail =>
                mail.id === mailId
                    ? { ...mail, isStarred: mail.status !== 'trash' ? newValue : mail.isStarred }
                    : mail
            )

            const mailToUpdate = updated.find(mail => mail.id === mailId)
            if (mailToUpdate && mailToUpdate.status !== 'trash') {
                mailService.save(mailToUpdate).then(() => loadMails())
                    .catch(err => console.error('Failed to update starred:', err))
            }
            return updated
        })
    }

    function onRemove(mailId) {

        const date = Date.now()

        setMails(prevMails => {
            const updated = prevMails.map(mail =>
                mail.id === mailId ?
                    {
                        ...mail,
                        status: 'trash', removedAt: date, isStarred: false
                    } : mail
            )

            const mailToUpdate = updated.find(mail => mail.id === mailId)
            mailService.save(mailToUpdate).then(() => {
                loadMails()
            })

            return updated
        })
    }

    // function onDeleteMail(mailId) {
    //     mailService.remove(mailId)
    //         .then(() => {
    //             setMails(mails => (
    //                 mails.filter(mail => mail.id !== mailId)
    //             ))
    //         })
    //         .catch(err => {
    //             console.log('err:', err)
    //             navigate('/mail')
    //         })
    //         .finally(() => {
    //             console.log('finally');
    //         })
    // }

    const onBack = () => setSelectedMail(null);

    if (!mails) return <div className="loader">Loading...</div>

    const loadingClass = isLoading ? 'loading' : ''

    return (
        <section className="mail-index">
            <RightSideBar
                defaultFilter={filterBy}
                onSetFilter={onSetFilter}
                onCompose={() => setIsComposeOpen(true)}
            />
            {selectedMail ?
                (<MailDetails
                    mail={selectedMail}
                    onBack={onBack} />)
                : (
                    <MailList
                        loadingClass={loadingClass}
                        mails={mails}
                        onOpenMail={onOpenMail}
                        onSelectMail={setSelectedMail}
                        onStar={handleStar}
                        onRemove={onRemove}
                    />)
            }
            {isComposeOpen && (
                <NewMail 
                onClose={() => setIsComposeOpen(false)}
                onSend={onSendMail} />
            )}
            <LeftSideBar />
        </section>

    )
}

