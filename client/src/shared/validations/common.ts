import * as Yup from 'yup'
import i18next from 'i18next'

import { MB } from 'shared/consts'

export const commonStringValidation = (field: string, minSymbols: number = 1) =>
  Yup.string()
    .min(
      minSymbols,
      i18next.t('validation:error.minSymbols', {
        field,
        count: minSymbols,
      })
    )
    .required(
      i18next.t('validation:error.isRequired', {
        field,
      })
    )

export const commonNumberRangeValidation = ({
  field,
  min = Infinity,
  max = Infinity,
}: {
  field: string
  min?: number
  max?: number
}) =>
  Yup.number()
    .min(
      min,
      i18next.t('validation:error.minSymbols', {
        field,
        count: min,
      })
    )
    .max(
      max,
      i18next.t('validation:error.maxSymbols', {
        field,
        count: max,
      })
    )
    .required(
      i18next.t('validation:error.isRequired', {
        field,
      })
    )

export const emailValidation = () =>
  Yup.string()
    .email(
      i18next.t('validation:error.validField', {
        field: i18next.t('user:email'),
      })
    )
    .required(
      i18next.t('validation:error.isRequired', {
        field: i18next.t('user:email'),
      })
    )

export const passwordValidation = () =>
  Yup.string()
    .min(
      8,
      i18next.t('validation:error.minSymbols', {
        field: i18next.t('user:password'),
        count: 8,
      })
    )
    .required(
      i18next.t('validation:error.isRequired', {
        field: i18next.t('user:password'),
      })
    )

export const confirmPasswordValidation = () =>
  Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      i18next.t('validation:error.needMatched', {
        field: i18next.t('user:password'),
      })
    )
    .required(
      i18next.t('validation:error.isRequired', {
        field: i18next.t('user:confirmPassword'),
      })
    )

export const fullNameValidation = () =>
  Yup.string().required(
    i18next.t('validation:error.isRequired', {
      field: i18next.t('user:fullName'),
    })
  )

export const fileValidation = ({
  field,
  maxSize,
  fileFormats,
}: {
  field: string
  maxSize: number
  fileFormats: string[]
}) =>
  Yup.mixed()
    .test(
      field,
      i18next.t('validation:error.isRequired', {
        field: i18next.t('common.file'),
      }),
      (value) => Boolean(value)
    )
    .test(
      field,
      i18next.t('validation:error.largeFile', {
        max: maxSize / MB,
      }),
      (value) => value?.size <= maxSize
    )
    .test(
      field,
      i18next.t('validation:error.correctFileFormats', {
        formats: fileFormats.join(', ').replace(/\//g, '.'),
      }),
      (value) => fileFormats.includes(value?.type)
    )
