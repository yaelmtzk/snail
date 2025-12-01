const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from 'cmps/AppHeader.jsx'
import { About } from 'pages/About.jsx'
import { Home } from 'pages/Home.jsx'
import { MailIndex } from 'pages/MailIndex.jsx'
import { MailDetails } from 'pages/MailDetails.jsx'

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                </Routes>
            </section>
        </Router>
    )
}
