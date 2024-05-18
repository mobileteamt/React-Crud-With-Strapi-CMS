import React from 'react'
import Auth from './Auth'

export default function Dashboard() {
  if(Auth()){
    return (
      <>
        <h3 className='pb-3'>Dashboard</h3>
        <h6>Welcome Admin to your dashboard</h6>
      </>
    )
  }
}
