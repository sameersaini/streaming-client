import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchStream, deleteStream } from '../../actions'
import Modal from '../Modal'
import history from '../../history'

class StreamDelete extends Component {

    componentDidMount () {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions () {
        return (
            <div>
                <button
                    onClick={() => this.props.deleteStream(this.props.match.params.id)}
                    className="ui button negative"
                >Delete
                </button>
                <Link to="/" className="ui button">Cancel</Link>
            </div>
        )
    }

    renderContent () {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete stream with title: ${this.props.stream.title}?`
    }

    render () {
        return (
            <React.Fragment>
                <h3>Delete Stream</h3>
                <Modal
                    id={this.props.match.params.id}
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)