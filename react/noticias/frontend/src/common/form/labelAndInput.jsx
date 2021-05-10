import React from 'react'

export default props => (
    <div className="row g-3">
        <label htmlFor={props.name} className="col-sm-2 col-form-label">{props.label}</label>
        <div className="col-sm-10">
            <input {...props.input} className="form-control"
                placeholder={props.placeholder}
                readOnly={props.readOnly} type={props.type} />
        </div>
    </div>
)