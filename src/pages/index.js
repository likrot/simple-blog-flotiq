import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
    render() {
        const { data } = this.props;
        const siteTitle = data.site.siteMetadata.title;
        const posts = data.allBlogpost.edges;

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="All posts" />
                {posts.map(({ node }) => {
                    const title = node.title || node.slug;
                    return (
                        <div
                            style={{
                                maxWidth: rhythm(31),
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            <article
                                key={node.slug}
                                style={{
                                    padding: `0 ${rhythm(6.5 / 3)}`,
                                }}
                            >
                                <header>
                                    <h3
                                        style={{
                                            marginBottom: rhythm(1 / 4),
                                            color: 'yellow',
                                        }}
                                    >
                                        <Link
                                            style={{
                                                boxShadow: `none`,
                                                color: 'white',
                                            }}
                                            to={node.slug}
                                        >
                                            {title}
                                        </Link>
                                    </h3>
                                    <small>{node.date}</small>
                                </header>
                                <section>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: node.description || node.excerpt,
                                        }}
                                    />
                                </section>
                            </article>
                        </div>
                    )
                })}
            </Layout>
        )
    }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allBlogpost(sort: {fields: flotiqInternal___createdAt, order: DESC}) {
      edges {
        node {
        headerImage {
          extension
          id
        }
        content
        id
        slug
        title
      }
      }
    }
  }
`;
