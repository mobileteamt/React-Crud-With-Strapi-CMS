import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import config from '../Config.json'
var API_BASE_URL = config.API_BASE_URL;

export default function Login() {

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    var login = (e) => {
        e.preventDefault();
        if(identifier == ''){
            toast.error("Email is required");
        }
        else if(password == ''){
            toast.error("Password is required");
        }
        else{
            try{
                axios.post(`${API_BASE_URL}/api/auth/local`, {
                    identifier: identifier,
                    password: password,
                })
                .then(response => {
                    // console.log('User profile', response.data.user);
                    localStorage.setItem('admin_id', response.data.user.id);
                    localStorage.setItem('admin_email', response.data.user.email);
                    localStorage.setItem('token', response.data.jwt);
                    localStorage.setItem('isAdminLoggedIn', 'true');
                    window.location.href = "/admin/dashboard";
                })
                .catch(error => {
                    if(error.response && error.response.data.error.name == 'ValidationError'){
                        var message = "Invalid login credentials.";
                    }
                    else{
                        var message = "Login failed. Please try again letter.";
                    }
                    toast.error(message);
                    return false;
                });
            }
            catch(error){
                toast.error(error);
            }            
        }
    }

    return (
        <>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
                <h3 className="text-center">Admin Login</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name="email" value={identifier} onChange={(e)=>{setIdentifier(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    </Form.Group>
                
                    <Button className="btn btn-info text-white" type="submit" onClick={(e)=>{login(e)}}>Login</Button>
                </Form>
            </Col>
            <ToastContainer />
        </>
    )
}
