import * as Yup from 'yup'
import i18next from 'i18next'

export const creditCardValidation = (field: string, count: number) =>
  Yup.string()
    .matches(/^\d+$/, i18next.t('validation:error.shouldOnlyBeNumbers', { field }))
    .test(
      'length',
      i18next.t('validation:error.symbol', {
        field,
        count: count
      }),
      (value) => typeof value === 'string' && value.length === count
    )
    .required(
      i18next.t('validation:error.isRequired', {
        field
      })
    )

export const expirationDate = (field: string) =>
  Yup.string()
    .typeError(i18next.t('validation:error.validExpiryDate', {
      field
    }))
    .max(5, i18next.t('validation:error.validExpiryDate', {
      field
    }))
    .matches(/([0-9]{2})\/([0-9]{2})/, i18next.t('validation:error.validExpiryDate', {
      field
    }))
    .required(i18next.t('validation:error.isRequired', {
      field
    }))
