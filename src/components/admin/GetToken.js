import React, { useEffect, useState } from 'react'

export default function GetToken() {

    const [jwt, setJwt] = useState(null);

    useEffect(()=>{
        try {
            let token = localStorage.getItem('token');
            if(token){
                //logged in
                setJwt(token);
            }
        } catch (error) {
            setJwt(null);
        }
       
    },[]);

    return (jwt);
}
