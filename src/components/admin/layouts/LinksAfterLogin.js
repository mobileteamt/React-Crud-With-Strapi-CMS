import React, { useEffect } from 'react'
import { Nav } from 'react-bootstrap';

export default function LinksAfterLogin() {
    return (
        <>
            <Nav.Link href="/admin/dashboard" className="head-links">Dashboard</Nav.Link>
            <Nav.Link href="/admin/blog-list" className="head-links">Blog</Nav.Link>
        </>
    )
}
