import React from "react"
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (<Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keywords} />
    </Helmet>


    )
}

Meta.defaultProps = {
    title: 'Welcome To Pin Cafes',
    description: 'Pin Cafes is the number one place to purchase WAEC, NECO, NABTEB and other exam scratch cards. You can also do Jamb data correction, O level upload and passport reset.',
    keywords: 'cards, scratch cards, PINs, Tokens, result checkers, Jamb password reset, data correction, o level upload, JAMB, UTME, DE, Direct Entry',
}

export default Meta