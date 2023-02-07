import { Typography } from '@mui/material'
import clsx from 'clsx'
import { useFormikContext } from 'formik'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './_textEditor.scss'

interface Props {
  field: string
}

function QuillField({ field }: Props) {
  const { touched, values, errors, setFieldValue } = useFormikContext<any>()

  return (
    <>
      <ReactQuill
        theme="snow"
        value={values.description}
        onChange={(html: string) => setFieldValue(field, html)}
        className={clsx('quill', touched[field] && Boolean(errors[field]) && 'error')}
      />
      {touched[field] && (
        <Typography sx={{ ml: 2 }} color="error.main" variant="subtitle2">
          {errors[field]}
        </Typography>
      )}
    </>
  )
}

export default QuillField
