import React from 'react'
import Home from './home/Home'
import SignIn from './sign-in/SignIn'

export default [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'sign-in',
    path: '/sign-in',
    component: SignIn,
  },
]
