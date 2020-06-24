import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
    render() {
        const { location, title, children } = this.props
        const rootPath = `${__PATH_PREFIX__}/`
        let header

        if (location.pathname === rootPath) {
            header = (
                <h1
                    style={{
                        ...scale(1.5),
                        marginBottom: rhythm(1.5),
                        marginTop: 0,
                        color: 'yellow',
                        textAlign: 'center',
                    }}
                >
                    <Link
                        style={{
                            boxShadow: `none`,
                            textDecoration: `none`,
                            color: `inherit`,
                        }}
                        to={`/`}
                    >
                        {title}
                    </Link>
                </h1>
            )
        } else {
            header = (
                <h3
                    style={{
                        fontFamily: `Montserrat, sans-serif`,
                        marginTop: 0,
                    }}
                >
                    <Link
                        style={{
                            boxShadow: `none`,
                            textDecoration: `none`,
                            color: `inherit`,
                        }}
                        to={`/`}
                    >
                        {title}
                    </Link>
                </h3>
            )
        }
        return (
            <div
                style={{
                    marginLeft: `auto`,
                    marginRight: `auto`,
                    maxWidth: rhythm(80),
                    padding: `${rhythm(1.5)} ${rhythm(2 / 4)}`,
                    width: '80%',
                }}
            >
                <header>{header}</header>
                <main>{children}</main>
                <footer
                    style={{
                        textAlign: 'center',
                        marginTop: rhythm(3),
                    }}
                >
                    © {new Date().getFullYear()} likrot, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                    {` & `}
                    <a href="https://flotiq.com">Flotiq</a>
                </footer>
            </div>
        )
    }
}

export default Layout
