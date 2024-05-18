import React from 'react'
import HeadNav from './HeadNav'
import Auth from '../Auth'

export default function AdminHeader() {
  if(Auth(true)){
    return (
      <HeadNav/>
    )
  }
}
