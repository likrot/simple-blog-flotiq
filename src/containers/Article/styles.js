import { rhythm, scale } from "../../utils/typography";

export const styles = {
    section: {
        fontSize: rhythm(4/5),
        width: scale(4/5),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    footer: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    h1: {
        marginTop: rhythm(1),
        marginBottom: 50,
        textAlign: 'center',
        fontSize: rhythm(2),
    },
    p: {
        ...scale(-1 / 5),
        display: `block`,
        marginBottom: rhythm(1),
    },
    hr: {
        marginBottom: rhythm(1),
        width: rhythm(20),
        backgroundColor: 'white',
    },
    img: {
        width: '100%',
        height: 'auto'
    },
};
