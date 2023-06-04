import { Box, Typography, InputBase, IconButton } from '@mui/material'
import { FilesModel } from 'pages/FileManager/model'
import { useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import CheckIcon from '@mui/icons-material/Check'

const TitleInput = (value: any, onSave: void) => {
  const [isActive, setIsActive] = useState(true)
  const [nameInputValue, setNameInputValue] = useState(FilesModel.folder?.name)

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
        {isActive && (
          <Typography
            variant="h5"
            sx={{
              pt: '5px',
              pl: '12px',
              mb: '10.5px'
            }}
          >
            {nameInputValue}
          </Typography>
        )}
        {!isActive && (
          <InputBase
            value={nameInputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNameInputValue(e.target.value)
            }}
            size="small"
            fullWidth
            sx={{
              fontSize: 24,
              fontWeight: 'bold',
              p: 0.5,
              pl: 1.5,
              color: ({ palette }) => palette.text.primary,
              backgroundColor: ({ palette }) => palette.action.hover,
              borderRadius: '15px'
            }}
          />
        )}
        <IconButton size="small">
          {isActive && <MdOutlineEdit onClick={() => setIsActive(!isActive)} />}
          {!isActive && (
            <CheckIcon
              onClick={() => {
                setIsActive(!isActive)
                // onSave(nameInputValue, FilesModel.folder?.id)
              }}
            />
          )}
        </IconButton>
      </Box>
    </>
  )
}

export default TitleInput
