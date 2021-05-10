import React from 'react'


export default function ValueProps(props) {
    const { _id, title, description, date } = props.dados
    return (
        <tr>
            <td>{title}</td>
            <td>{description}</td>
            <td>{date}</td>
            <td>
                <button className="btn btn-warning" onClick={() => props.showUpdate(_id)}>
                    <i className="bi bi-pencil-fill"></i>
                </button>
            </td>
        </tr>
    )
}