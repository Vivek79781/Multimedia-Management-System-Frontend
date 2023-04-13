import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

const Home = ({ auth: { isAuthenticated } }) => {
    console.log('isAuthenticated', isAuthenticated)
    if(isAuthenticated) {
        return (
            <Navigate to="/dashboard" />
        )
    }
    return (
        <section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
            <h1 className="x-large">Multimedia Management System</h1>
            <p className="lead">
                Create a Multimedia Management System for storing and managing multimedia files
            </p>
            <div className="buttons">
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
                <Link to="/login" className="btn btn-light">Login</Link>
            </div>
            </div>
        </div>
        </section>
    )
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Home)