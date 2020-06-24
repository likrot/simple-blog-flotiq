import React from 'react';
import { Link } from 'gatsby';

import { styles } from './styles';

const Navigation = props => {
    const { navPrevious, navNext } = props;
    return(
        <>
            <nav style={styles.nav}>
                <ul style={styles.ul}>
                    <li>
                        {navPrevious && (
                            <Link
                                to={navPrevious.slug}
                                rel="prev"
                            >
                                ← {navPrevious.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {navNext && (
                            <Link
                                to={navNext.slug}
                                rel="next"
                            >
                                {navNext.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navigation;
