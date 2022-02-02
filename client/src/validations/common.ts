import * as yup from 'yup'

export const emailValidation = yup
  .string()
  .email('Enter a valid email')
  .required('Email is required')

export const passwordValidation = yup
  .string()
  .min(8, 'Password should be of minimum 8 characters length')
  .required('Password is required')

export const confirmPasswordValidation = yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
