import { useFormikContext } from 'formik'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './_textEditor.scss'

function QuillField() {
  const {
    values: { description },
    setFieldValue,
  } = useFormikContext<any>()

  return (
    <ReactQuill
      theme="snow"
      value={description}
      onChange={(html: string) => setFieldValue('description', html)}
      className=".quill"
    />
  )
}

export default QuillField
