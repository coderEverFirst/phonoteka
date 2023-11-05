// ================ colors ================
export const MAIN_BACKGROUND_COLOR = '#f8f0e5'
export const MAIN_LIGHTCREAM_COLOR = '#eadbc8'
export const MAIN_DARKCREAM_COLOR = '#dac0a3'
export const MAIN_DARKCREAM_HOVER_COLOR = '#d9ba98'
export const MAIN_BLUE_COLOR = '#102c57'
export const MAIN_GRAY_COLOR = '#5b5a5a'

// ================ render objects ================

export interface IRenderAuthLoginData {
  title: string
  inputs: {
    id: string
    name: string
    type: string
    label: string
  }[]
  buttons: {
    id: string
    name: string
    path?: string
    label: string
    className?: string
  }[]
}

export const RENDER_AUTH_LOGIN_DATA: IRenderAuthLoginData = {
  title: 'LOGIN',
  inputs: [
    {
      id: '1',
      name: 'login',
      type: 'text',
      label: 'Enter your login',
    },
    {
      id: '2',
      name: 'password',
      type: 'password',
      label: 'Enter your password',
    },
  ],
  buttons: [
    {
      id: '1',
      name: 'login',
      path: '/', //go to main component
      label: 'login',
    },
    {
      id: '2',
      name: 'sign up',
      path: '/sign-up',
      label: 'to sign up',
      className: 'auth_registration_btn',
    },
  ],
}

export const RENDER_AUTH_SIGNUP_DATA: IRenderAuthLoginData = {
  title: 'SIGN UP',
  inputs: [
    {
      id: '1',
      name: 'login',
      type: 'text',
      label: 'Enter your login',
    },
    {
      id: '2',
      name: 'password',
      type: 'password',
      label: 'Enter your password',
    },
    {
      id: '3',
      name: 'rePassword',
      type: 'password',
      label: 'Enter password again',
    },
  ],

  buttons: [
    {
      id: '1',
      name: 'sign up',
      path: '/', //need create new user on server
      label: 'sign up',
      className: 'auth_registration_btn',
    },
    {
      id: '2',
      name: 'login',
      label: 'to login',
      path: '/login',
    },
  ],
}

export interface IRenderTableHeaderData {
  id: number
  lable: string
  width: string
}

export const RENDER_TABLE_HEADER_DATA: IRenderTableHeaderData[] = [
  { id: 0, lable: '', width: '2%' },
  { id: 1, lable: 'Name', width: '23%' },
  { id: 2, lable: 'Band', width: '25%' },
  { id: 3, lable: 'Album', width: '20%' },
  { id: 4, lable: 'Year', width: '10%' },
  { id: 5, lable: 'Genre', width: '10%' },
  { id: 6, lable: 'Format', width: '10%' },
]
