import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href={'/'}>React App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="head-links">Home</Nav.Link>
                        <Nav.Link href="/blog" className="head-links">Blog</Nav.Link>
                    </Nav>    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )   
}
