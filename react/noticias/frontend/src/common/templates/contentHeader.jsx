import React from 'react'

export default props => (

    <figure className="text-start">
        <blockquote className="blockquote">
            <p>{props.title} </p>
        </blockquote>
        <figcaption className="blockquote-footer">
            <cite title="Source Title">{props.small}</cite>
        </figcaption>
    </figure>
)


