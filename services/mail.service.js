import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const MAIL_KEY = 'mailDB'

const gMails = [
  { id: 'e101', name: 'Mimi', createdAt: 1712179200000, subject: 'Miss you!', body: 'Would love to catch up sometime. Been thinking about you lately.', isRead: false, isStarred: false, sentAt: 1712265600000, removedAt: null, from: 'mimi@mimi.com', to: 'user@smail.com' },
  { id: 'e102', name: 'ShopNow', createdAt: 1709006400000, subject: 'Your order has shipped', body: 'Your package is on its way! Expected delivery: 2–3 business days.', isRead: true, isStarred: false, sentAt: 1709092800000, removedAt: null, from: 'store@shopnow.com', to: 'user@smail.com' },
  { id: 'e103', name: 'Boss', createdAt: 1711027200000, subject: 'Meeting rescheduled', body: 'Reminder: our meeting moved to Thursday.', isRead: true, isStarred: true, sentAt: 1711113600000, removedAt: null, from: 'boss@work.com', to: 'user@smail.com' },
  { id: 'e104', name: 'Mom', createdAt: 1713004800000, subject: 'Family update', body: 'Hope you’re doing well! The family misses you and can’t wait to meet soon.', isRead: false, isStarred: false, sentAt: 1713091200000, removedAt: null, from: 'mom@family.com', to: 'user@smail.com' },
  { id: 'e105', name: 'Friend', createdAt: 1708500000000, subject: 'Beach day moved', body: 'Weather looks better on Thursday — let’s go then.', isRead: false, isStarred: false, sentAt: 1708586400000, removedAt: null, from: 'friend@friends.com', to: 'user@smail.com' },
  { id: 'e106', name: 'Promo', createdAt: 1710500000000, subject: '🔥 Limited-Time Offer Just for You!', body: 'Save 40% today! Huge discounts across all categories. Don’t miss this exclusive offer.', isRead: false, isStarred: false, sentAt: 1710586400000, removedAt: null, from: 'promo@bigsales.com', to: 'user@smail.com' },
  { id: 'e107', name: 'Spammy', createdAt: 1711500000000, subject: 'You won a free prize!!! 🎉', body: 'Click HERE to claim your reward now! Limited time!', isRead: false, isStarred: false, sentAt: 1711586400000, removedAt: null, from: 'spammy@unknown.win', to: 'user@smail.com' },
  { id: 'e108', name: 'Torah Weekly', createdAt: 1709500000000, subject: 'פרשת השבוע - ויצא', body: 'שלום! השבוע קוראים את פרשת ויצא...', isRead: false, isStarred: false, sentAt: 1709586400000, removedAt: null, from: 'torah-weekly@jewishmail.org', to: 'user@smail.com' },
  { id: 'e109', name: 'Noa', createdAt: 1712000000000, subject: 'שלום, רציתי לשאול', body: 'היי, יש לי שאלה לגבי מה שדיברנו...', isRead: true, isStarred: false, sentAt: 1712086400000, removedAt: null, from: 'noa@gmail.com', to: 'user@smail.com' },
  { id: 'e110', name: 'Me', createdAt: 1714000000000, subject: 'Note to myself', body: 'Reminder: finish the side project...', isRead: false, isStarred: false, sentAt: 1714086400000, removedAt: null, from: 'user@smail.com', to: 'user@smail.com' },

  { id: 'e111', name: 'Billing', createdAt: 1713006400000, subject: 'Invoice for April', body: 'Your monthly invoice is ready to view...', isRead: false, isStarred: false, sentAt: 1713092800000, removedAt: null, from: 'billing@service.com', to: 'user@smail.com' },
  { id: 'e112', name: 'Daniel', createdAt: 1712200000000, subject: 'Quick question', body: 'Hey! Are you free for a short call later today?', isRead: true, isStarred: false, sentAt: 1712286400000, removedAt: null, from: 'daniel@friends.com', to: 'user@smail.com' },
  { id: 'e113', name: 'Delivery', createdAt: 1713500000000, subject: 'Your package is waiting', body: 'We tried delivering your package...', isRead: false, isStarred: false, sentAt: 1713586400000, removedAt: null, from: 'delivery@courier.com', to: 'user@smail.com' },
  { id: 'e114', name: 'Security', createdAt: 1709200000000, subject: 'Security alert', body: 'A login attempt was detected...', isRead: true, isStarred: false, sentAt: 1709286400000, removedAt: null, from: 'security@webmail.com', to: 'user@smail.com' },
  { id: 'e115', name: 'Lily', createdAt: 1711800000000, subject: 'Weekend plans?', body: 'Any chance you want to plan something fun this weekend?', isRead: false, isStarred: false, sentAt: 1711886400000, removedAt: null, from: 'lily@friends.com', to: 'user@smail.com' },

  { id: 'e116', name: 'Support', createdAt: 1711000000000, subject: 'Your subscription expires soon', body: 'Your premium subscription expires in 5 days...', isRead: false, isStarred: true, sentAt: 1711086400000, removedAt: null, from: 'support@premiumplus.com', to: 'user@smail.com' },
  { id: 'e117', name: 'Recruiting', createdAt: 1711600000000, subject: 'Job opportunity', body: 'We reviewed your profile and think you might be a good fit...', isRead: false, isStarred: false, sentAt: 1711686400000, removedAt: null, from: 'recruiting@hiringnow.com', to: 'user@smail.com' },
  { id: 'e118', name: 'Chef', createdAt: 1712400000000, subject: 'Recipe you asked for', body: 'Here’s the recipe...', isRead: true, isStarred: true, sentAt: 1712486400000, removedAt: null, from: 'chef@kitchenmail.com', to: 'user@smail.com' },
  { id: 'e119', name: 'System Admin', createdAt: 1710500000000, subject: 'System maintenance', body: 'Our services will be undergoing maintenance tonight...', isRead: false, isStarred: false, sentAt: 1710586400000, removedAt: null, from: 'admin@system.com', to: 'user@smail.com' },
  { id: 'e120', name: 'Friend 2', createdAt: 1713000000000, subject: 'Congrats!', body: 'Just wanted to say congratulations!', isRead: true, isStarred: false, sentAt: 1713086400000, removedAt: null, from: 'friend2@friends.com', to: 'user@smail.com' },

  { id: 'e121', name: 'Yossi Cohen', createdAt: 1711506400000, subject: 'Meeting Reminder', body: 'Don’t forget our meeting tomorrow at 10:00 AM.', isRead: false, isStarred: false, sentAt: 1711592800000, removedAt: 1711600000000, from: 'yossi@workmail.com', to: 'user@smail.com' },
  { id: 'e122', name: 'שרה לוי', createdAt: 1711806400000, subject: 'תזכורת פרויקט', body: 'נא להגיש את דוח הפרויקט עד יום חמישי.', isRead: false, isStarred: false, sentAt: 1711892800000, removedAt: 1711900000000, from: 'sara@hebrewmail.com', to: 'user@smail.com' },
  { id: 'e123', name: 'ישראל כהן', createdAt: 1712106400000, subject: 'שיחת צוות', body: 'השיחה השבועית נדחתה ליום רביעי בשעה 15:00.', isRead: true, isStarred: false, sentAt: 1712192800000, removedAt: 1712200000000, from: 'israel@hebrewmail.com', to: 'user@smail.com' },
  { id: 'e124', name: 'פרשת השבוע', createdAt: 1712506400000, subject: 'פרשת וירא', body: 'שלום! השבוע נקרא את פרשת וירא, עם הסברים והערות. שבוע מבורך!', isRead: false, isStarred: false, sentAt: 1712592800000, removedAt: 1712600000000, from: 'torah-weekly@jewishmail.org', to: 'user@smail.com' },
  { id: 'e125', name: 'Promo', createdAt: 1712806400000, subject: '🔥 Flash Sale Today Only!', body: 'Everything is 50% off! Grab your favorites before midnight.', isRead: false, isStarred: false, sentAt: 1712892800000, removedAt: 1712900000000, from: 'promo@bigsales.com', to: 'user@smail.com' },

  { id: 'e126', name: 'Me', createdAt: 1713000000000, subject: 'Project update', body: 'I have completed the first draft of the project report.', isRead: true, isStarred: false, sentAt: 1713086400000, removedAt: null, from: 'user@smail.com', to: 'team@workmail.com' },
  { id: 'e127', name: 'Me', createdAt: 1713100000000, subject: 'Lunch plans', body: 'Are you free for lunch tomorrow at 12:30?', isRead: true, isStarred: false, sentAt: 1713186400000, removedAt: null, from: 'user@smail.com', to: 'friend@friends.com' },
  { id: 'e128', name: 'Me', createdAt: 1713200000000, subject: 'Invoice attached', body: 'Please find attached the invoice for last month’s services.', isRead: true, isStarred: false, sentAt: 1713286400000, removedAt: null, from: 'user@smail.com', to: 'client@business.com' },
  { id: 'e129', name: 'Me', createdAt: 1713300000000, subject: 'Follow up', body: 'Just following up on my previous email regarding the proposal.', isRead: true, isStarred: false, sentAt: 1713386400000, removedAt: null, from: 'user@smail.com', to: 'partner@workmail.com' },
  { id: 'e130', name: 'Me', createdAt: 1713400000000, subject: 'Party Invitation', body: 'You’re invited to my birthday party this Saturday at 7 PM!', isRead: true, isStarred: false, sentAt: 1713486400000, removedAt: null, from: 'user@smail.com', to: 'friends@friends.com' },

  { id: 'e136', name: 'Me', createdAt: 1713000000000, subject: 'Draft: Team Agenda', body: 'Need to finalize the agenda for next week’s team meeting.', isRead: false, isStarred: false, sentAt: null, removedAt: null, from: 'user@smail.com', to: 'team@workmail.com' },
  { id: 'e137', name: 'Me', createdAt: 1713100000000, subject: 'Draft: תכנון יום הולדת', body: 'חושב להזמין את כולם למסיבה בשבת הקרובה.', isRead: false, isStarred: false, sentAt: null, removedAt: null, from: 'user@smail.com', to: 'friends@friends.com' },
  { id: 'e138', name: 'Me', createdAt: 1713200000000, subject: 'Draft: חוות דעת על ספר', body: 'מנסח חוות דעת קצרה על הספר שסיימתי לקרוא.', isRead: false, isStarred: false, sentAt: null, removedAt: null, from: 'user@smail.com', to: 'bookclub@friends.com' },
  { id: 'e139', name: 'Me', createdAt: 1713300000000, subject: 'Draft: Reminder Email', body: 'Reminder to check the progress of the pending tasks.', isRead: false, isStarred: false, sentAt: null, removedAt: null, from: 'user@smail.com', to: 'colleague@workmail.com' },
  { id: 'e140', name: 'Me', createdAt: 1713400000000, subject: 'Draft: Travel Plans', body: 'Planning the itinerary for the upcoming trip; need input.', isRead: false, isStarred: false, sentAt: null, removedAt: null, from: 'user@smail.com', to: 'family@family.com' },
]


const gLoggedinUser = {
  email: 'user@smail.com',
  fullname: 'Susy smail'
}

_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
  createMail,
  getDefaultFilter,
  markAsRead
}

function query(filterBy = {}) {
  const { status, isStarred, txt } = filterBy

  return storageService.query(MAIL_KEY).then(mails => {

    if (txt) {
      const regExp = new RegExp(txt, 'i')
      return mails.filter(mail =>
        regExp.test(mail.subject) || regExp.test(mail.body)
      )
    }
    
    if (isStarred && status !== 'trash') {
      return mails.filter(mail => mail.isStarred === true)
    }

    if (status) {
      if (status === 'inbox') {
        mails = mails.filter(mail =>
          mail.to === gLoggedinUser.email && !mail.removedAt
        )
      }
      if (status === 'sent') {
        mails = mails.filter(mail =>
          mail.from === gLoggedinUser.email && mail.sentAt)
      }
      if (status === 'trash') {
        mails = mails.filter(mail => mail.removedAt)
      }
      if (status === 'draft') {
        mails = mails.filter(mail => !mail.sentAt)
      }
    }
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function getDefaultFilter() {
  return {
    status: 'inbox',
    txt: '',
    isRead: false,
    isStarred: false,
    isRemoved: false,
    lables: []
  }
  
}

function getEmptyMail(to = '', subject = '', body = '') {
  return {
    id: '',
    name: 'Me',
    createdAt: Date.now(),
    subject,
    body,
    isRead: true,
    sentAt: Date.now(),
    removedAt: null,
    from: gLoggedinUser.email,
    to
  }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = gMails
    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

// function _createMail() {
//   const mail = getEmptyMail()
//   mail.id = '
//   return mail
// }

function createMail(to, subject, body) {
  return getEmptyMail (to, subject, body)
}

function markAsRead(mailId) {
  return get(mailId).then(mail => {
    if (!mail.isRead) {
      mail.isRead = true
      return save(mail)
    }
  })
}