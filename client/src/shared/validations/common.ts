import * as yup from 'yup'
import i18next from 'i18next'

export const commonStringValidation = (field: string, minSymbols: number = 1) =>
  yup
    .string()
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
  yup
    .number()
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
  yup
    .string()
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
  yup
    .string()
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
  yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      i18next.t('validation:error.needMatched', {
        field: i18next.t('user:password'),
      })
    )
    .required(
      i18next.t('validation:error.isRequired', {
        field: i18next.t('user:confirmPassword'),
      })
    )
