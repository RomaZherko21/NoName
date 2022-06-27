import * as yup from 'yup'
import i18next from 'i18next'

export const commonStringValidation = (fieldName: string, minSymbols: number = 1) =>
  yup
    .string()
    .min(
      minSymbols,
      i18next.t('validation:error.minSymbols', {
        field: i18next.t(`user:${fieldName.toLowerCase()}`),
        count: minSymbols,
      })
    )
    .required(
      i18next.t('validation:error.isRequired', {
        field: i18next.t(`user:${fieldName.toLowerCase()}`),
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
