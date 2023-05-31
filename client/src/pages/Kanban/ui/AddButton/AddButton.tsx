import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Box, Button, TextField } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'

import { KanbanModel } from 'pages/Kanban/model'
interface Props {
  text: string
}

function AddButton({ text }: Props) {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [columnName, setColumnName] = useState('')

  return (
    <>
      {isFormOpen ? (
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            minWidth: 280,
            backgroundColor: 'background.rare',
            '&:hover': {
              backgroundColor: ({ palette }) =>
                !isFormOpen ? palette.action.hover : 'background.rare'
            }
          }}
        >
          <TextField
            size="small"
            placeholder={t(text)}
            fullWidth
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />

          <Box sx={{ display: 'flex', mt: 1, gap: 1 }}>
            <Button
              onClick={() => {
                setIsFormOpen(false)
                // KanbanModel.postColumn({ id: 1, position = columns.length, name: columnName }) // как быть с position
                setColumnName('')
              }}
              size="small"
              variant="contained"
              startIcon={<AiOutlinePlus />}
            >
              {t(text)}
            </Button>

            <Button
              onClick={() => {
                setIsFormOpen(false)
              }}
              size="small"
              sx={{ color: ({ palette }) => palette.text.secondary }}
            >
              {t('user:actions.cancel')}
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          startIcon={<AiOutlinePlus fontSize={16} />}
          onClick={() => {
            setIsFormOpen(true)
          }}
          sx={{
            color: ({ palette }) => palette.text.secondary,
            minWidth: 280,
            py: 1,
            m: 0,
            backgroundColor: 'background.rare',
            '&:hover': {
              backgroundColor: ({ palette }) =>
                !isFormOpen ? palette.action.hover : 'background.rare'
            }
          }}
        >
          {t(text)}
        </Button>
      )}
    </>
  )
}

export default observer(AddButton)
