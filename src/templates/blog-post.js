import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import Article from '../containers/Article/Article';
import Navigation from '../components/Navigation/Navigation';
import Comments from '../components/Comments/Comments';

class BlogPostTemplate extends React.Component {
    render() {
    
        const post = this.props.data.blogpost;
        const siteTitle = this.props.data.site.siteMetadata.title;
        const { previous, next } = this.props.pageContext;

        return (
            <GoogleReCaptchaProvider
                reCaptchaKey={process.env.GATSBY_GOOGLE_RECATPCHA_KEY}
            >
                <Layout location={this.props.location} title={siteTitle}>
                    <SEO
                        title={post.title}
                        description={post.content || post.excerpt}
                    />
                    {post &&
                    <SEO
                        title={post.title}
                        description={post.content || post.excerpt}
                    />
                    }

                    <Article
                        post={post}
                    />

                    {post &&
                    <>
                        <Comments
                            postId={post.id}
                        />
                    </>
                    }

                    <Navigation
                        navPrevious={previous}
                        navNext={next}
                    />
                </Layout>
            </GoogleReCaptchaProvider>
        )
    }
}

export default BlogPostTemplate

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  site {
    siteMetadata {
      title
    }
  }
  blogpost( slug: { eq: $slug } ) {
    id
    title
    content
    headerImage {
      extension
      id
    }
  }
}
`;
