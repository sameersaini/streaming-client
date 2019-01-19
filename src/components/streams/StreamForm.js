import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends Component {
    renderError = ({error, touched}) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`
        return (
            <div className={className}>
                <label htmlFor={input.name}>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (values) => {
        this.props.onSubmit(values)
    }

    render () {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" label="Enter Title" component={this.renderInput}/>
                <Field name="description" label="Enter Description" component={this.renderInput}/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = ({title, description}) => {
    const error = {}
    if (!title) {
        error.title = 'You must enter a title.'
    }

    if (!description) {
        error.description = 'You must enter a description.'
    }

    return error
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)


