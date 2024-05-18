import React from 'react'
import { Nav } from 'react-bootstrap'

export default function LinksBeforeLogin() {
    return (
        <>
            <Nav.Link href="/" className="head-links">Home</Nav.Link>
            <Nav.Link href="/admin/login" className="head-links">Login</Nav.Link>
            <Nav.Link href="/register" className="head-links">Register</Nav.Link>
        </>
    )
}
