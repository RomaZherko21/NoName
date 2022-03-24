import * as yup from 'yup'
import i18n from 'i18n'

export const commonStringValidation = (
  fieldName: string,
  minSymbols: number = 1
) =>
  yup
    .string()
    .min(
      minSymbols,
      i18n.t('validation:error.minSymbols', {
        field: i18n.t(`user:${fieldName.toLowerCase()}`),
        count: minSymbols,
      })
    )
    .required(
      i18n.t('validation:error.isRequired', {
        field: i18n.t(`user:${fieldName.toLowerCase()}`),
      })
    )

export const emailValidation = () =>
  yup
    .string()
    .email(
      i18n.t('validation:error.validField', {
        field: i18n.t('user:email'),
      })
    )
    .required(
      i18n.t('validation:error.isRequired', {
        field: i18n.t('user:email'),
      })
    )

export const passwordValidation = () =>
  yup
    .string()
    .min(
      8,
      i18n.t('validation:error.minSymbols', {
        field: i18n.t('user:password'),
        count: 8,
      })
    )
    .required(
      i18n.t('validation:error.isRequired', {
        field: i18n.t('user:password'),
      })
    )

export const confirmPasswordValidation = () =>
  yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      i18n.t('validation:error.needMatched', {
        field: i18n.t('user:password'),
      })
    )
    .required(
      i18n.t('validation:error.isRequired', {
        field: i18n.t('user:confirmPassword'),
      })
    )
