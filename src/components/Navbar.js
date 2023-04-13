import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined, FileOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    console.log('loading', loading)
    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard">
                    <UserOutlined />{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to="/multimedia">
                    <FileOutlined />{' '}
                    <span className="hide-sm">Multimedia</span>
                </Link>
            </li>
            <li>
                <Link to="/login" onClick={logout}>
                    <LogoutOutlined />{' '}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    )
    const guestLinks = (
        <ul>
            <li>
                <Link to="/multimedia">
                    <FileOutlined />{' '}
                    <span className="hide-sm">Multimedia</span>
                </Link>
            </li>
            <li>
                <Link to="/login">
                    <LoginOutlined />{' '}
                    <span className="hide-sm">Login</span>
                </Link>
            </li>
            <li>
                <Link to="/signup">
                    <UserAddOutlined />{' '}
                    <span className="hide-sm">Signup</span>
                </Link>
            </li>
        </ul>
    )


  return (
    <nav className="navbar bg-dark">
        <h1>
            <Link to="/">
                <i className="fas fa-code"></i> Multimedia App
            </Link>
        </h1>
        {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)}
    </nav>
  )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
