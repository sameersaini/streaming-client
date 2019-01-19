import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onSignIn, onSignOut } from '../actions/index'

class GoogleAuth extends Component {

    componentDidMount () {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '276015908651-e266p3916oai9mbgbkgj7lphjgki6g60.apps.googleusercontent.com',
                scope: 'email profile'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            }).catch((e) => {
                console.log('error in google oauth initialization: ', e)
            })
        })
    }

    onAuthChange = (isSignIn) => {
        isSignIn ? this.props.onSignIn(this.auth.currentUser.get().getId()) : this.props.onSignOut()
    }

    onSignInClick = () => {
        this.auth.signIn({prompt: 'select_account'})
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderSignIn () {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return <button className="ui red google button" onClick={this.onSignOutClick}>
                <i className="google icon"></i>
                Sign Out
            </button>
        } else {
            return <button
                className="ui green google button"
                onClick={this.onSignInClick}>
                <i className="google icon"></i>
                Sign In
            </button>
        }
    }

    render () {
        return (
            <div>
                {this.renderSignIn()}
            </div>
        )
    }
}

const mapStateToProps = ({auth}) => {
    return {isSignedIn: auth.isSignedIn}
}

export default connect(mapStateToProps, {onSignIn, onSignOut})(GoogleAuth)