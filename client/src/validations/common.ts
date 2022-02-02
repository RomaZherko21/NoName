// import { number, string } from 'yup'

// export const textValidation = ({
//   required = false,
//   max: maxSymbols = 500,
// } = {}) =>
//   required
//     ? string().max(maxSymbols, 'sdf').required('sdf')
//     : string().max(maxSymbols, 'sdf')

// export const emailValidation = ({
//   required = false,
//   max: maxSymbols = 100,
// } = {}) =>
//   required
//     ? string()
//         .email("i18next.t('validation:email')")
//         .max(maxSymbols, 'i18next.t(`validation:max${maxSymbols}`)')
//         .required()
//     : string().email().max(100, 'sdfsdf')

// export const numberValidation = ({ required = false } = {}) =>
//   required ? number().required('sdfsdfsdf') : number()

// export const passwordConfirmValidation = ({
//   required = false,
//   passwordName = 'pass',
//   message = 'validation:passwordNotConfirmed',
// } = {}) =>
//   required
//     ? string()
//         .test('equalStrings', 'i18next.t(message)', function validate(item) {
//           return item === this.parent[passwordName]
//         })
//         .required("i18next.t('validation:required')")
//     : string().test(
//         'equalStrings',
//         'i18next.t(message)',
//         function validate(item) {
//           return item === this.parent[passwordName]
//         }
//       )

export default 10
