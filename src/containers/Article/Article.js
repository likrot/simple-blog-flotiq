import React from 'react';

import Bio from '../../components/bio';

import { styles } from './styles';

const Article = props => {
    const { post } = props;
    return(
        <>
            {post ?
                <article>
                    <header>
                        <h1 style={styles.h1}>
                            {post.title}
                        </h1>
                    </header>
                    { post.headerImage && post.headerImage[0].id &&
                    <img src={`${process.env.GATSBY_FLOTIQ_BASE_URL}/image/1920x0/${post.headerImage[0].id}.${post.headerImage[0].extension}`} alt={post.title} style={styles.img}/>
                    }
                    <section
                        style={styles.section}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    <hr style={styles.hr}/>
                    <footer style={styles.footer}>
                        <Bio />
                    </footer>
                </article>
                :
                <p>Should be a post here....</p>
            }
        </>
    );
};

export default Article;
