import { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, SxProps, TextField, Theme } from '@mui/material'

import { onChangeEvent, onKeyDownEvent, onKeyUpEvent, onPasteEvent } from './helpers'

interface Props {
  onSubmit: (value: string) => void
  length?: number
  sx?: SxProps<Theme>
  error?: null | string
  setError?: (err: null | string) => void
}

const generateInputValuesArr = (num: number) =>
  new Array(num).fill(null).map((_, i) => ({
    name: `InputCell${i}`,
    value: null,
  }))

function VerificationCode({ length = 6, onSubmit, error = null, setError = () => {}, sx }: Props) {
  const [inputValues, setInputValues] = useState(() => generateInputValuesArr(length))

  const changeInputValue = useCallback(
    (index, value) => {
      const inputs = [...inputValues]
      inputs[index].value = value
      setInputValues(inputs)

      if (inputValues.length && inputValues.every((input) => input.value)) {
        const confirmCode = inputValues.reduce(
          (acc, item) => acc.concat(item.value ? item.value : ''),
          ''
        )
        onSubmit(confirmCode)
      }
    },
    [inputValues, onSubmit]
  )

  const handleFocus = useCallback(() => {
    if (error) {
      setError(null)
    }
  }, [error, setError])

  return (
    <Box sx={sx}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {inputValues.map((element) => (
          <TextField
            id={element.name}
            key={element.name}
            type="text"
            onKeyUp={onKeyUpEvent(changeInputValue)}
            onPaste={onPasteEvent(inputValues, changeInputValue)}
            onKeyDown={onKeyDownEvent(changeInputValue)}
            onChange={onChangeEvent(inputValues, changeInputValue)}
            onFocus={handleFocus}
            sx={{ width: 45 }}
            InputProps={{
              sx: { fontSize: 18 },
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default observer(VerificationCode)
