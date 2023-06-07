import { Box, Typography, InputBase, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import CheckIcon from '@mui/icons-material/Check'

interface Props {
  value: string
  onSave: (value: string) => void
}

const EditableInput = ({ value, onSave }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        {isEdit ? (
          <InputBase
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value)
            }}
            size="small"
            fullWidth
            sx={{
              fontSize: 24,
              fontWeight: 'bold',
              p: 0.5,
              color: ({ palette }) => palette.text.primary,
              backgroundColor: ({ palette }) => palette.action.hover,
              borderRadius: '15px'
            }}
          />
        ) : (
          <Typography
            variant="h5"
            sx={{
              p: 0.5
            }}
          >
            {inputValue}
          </Typography>
        )}

        <IconButton size="small">
          {isEdit ? (
            <CheckIcon
              onClick={() => {
                setIsEdit((pre) => !pre)
                onSave(inputValue)
              }}
            />
          ) : (
            <MdOutlineEdit onClick={() => setIsEdit((pre) => !pre)} />
          )}
        </IconButton>
      </Box>
    </>
  )
}

export default EditableInput
