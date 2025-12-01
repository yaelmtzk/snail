import { utilService } from '../services/util.service.js'
const { useState, useEffect } = React

export function MailPreview({ mail, onOpenMail, onStar, onRemove }) {

    const { id, name, subject, sentAt, isRead, isStarred } = mail


    const handleStarClick = (ev) => {
        ev.stopPropagation()
        onStar(id, !isStarred)
    }

    const handleRemoveClick = (ev) => {
        ev.stopPropagation()
        onRemove(id)
    }

    function onClickDisabled(ev) {
        ev.stopPropagation()
        return
    }

    const year = new Date(sentAt).getFullYear()
    const currYear = new Date().getFullYear()
    const displayYear = currYear>year? year : ''

    return (
        <article onClick={() => onOpenMail(id)}
            className={`mail-preview ${isRead ? 'read-mail' : ''}`}>

            <div className="sender-section">
                <span
                    className={`star preview-btn ${mail.removedAt ? 'disabled' : ''}`}
                    onClick={(ev) => {
                        ev.stopPropagation()
                        if (mail.removedAt) return
                        handleStarClick(ev)
                    }}
                >
                    <i className={`fa-solid fa-star ${isStarred ? 'on' : 'off'}`}
                    title={isStarred ? 'Starred' : 'Not Starred'}></i>
                </span>

                <div className="sender-name-prev" >{name}</div>

            </div>

            <div className="mail-subject">{subject}</div>

            <div className='last-cl-preview'>
                <div className={`trash-btn preview-btn ${mail.removedAt ? 'disabled' : ''}`}
                    title='Delete'
                    onClick={(ev) => {
                        ev.stopPropagation()
                        if (mail.removedAt) return
                        handleRemoveClick(ev)
                    }}
                >
                    <i className="fa-regular fa-trash-can"></i>
                </div>

                <div className="date-section">{`${utilService.getShortDate(sentAt)} ${displayYear}`}</div>
            </div>
        </article >
    )
}