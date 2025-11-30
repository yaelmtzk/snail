const { Link, NavLink } = ReactRouterDOM

export function MailHeader() {
    return (
        <header className="mail-header">
            <section className="header-left">
                {/* <i className="fa-solid fa-bars"></i> */}
                <img className="mail-logo"
                 src="../assets/img/smail-logo.png" alt="Mail Logo" />
                <div className="mail-logo-name">
                    <NavLink to="/mail">Smail</NavLink>
                </div>
            </section>

            {/* <section className="search-area">Search Bar</section> */}

            <nav>
                <NavLink to="/">Home</ NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}
