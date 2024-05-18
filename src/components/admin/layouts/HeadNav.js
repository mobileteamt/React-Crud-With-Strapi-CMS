import React from 'react'
import LinksBeforeLogin from './LinksBeforeLogin'
import LinksAfterLogin from './LinksAfterLogin'
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function HeadNav() {
    
    var links;
    var isLogin = false;
    if(localStorage.getItem('isAdminLoggedIn') == 'true'){
        links = <LinksAfterLogin/>;
        var isLogin = true;
    }
    else{
        links = <LinksBeforeLogin/>;
    }

    const logout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('admin_email');
        localStorage.removeItem('token');
        localStorage.removeItem('admin_id');
        window.location.href = "/admin/login";       
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href={isLogin ? '/admin/dashboard' : '/'}>Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {links}
                    </Nav>
                    {isLogin &&
                        <>
                            <a href="/" className="btn btn-success btn-sm btn-margin" type="button" target="_blank">Preview Site</a> 
                            <Nav>
                                <Nav.Link className="link-default head-links" onClick={logout}>Logout</Nav.Link>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
