import { useState, useMemo, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Box, Paper, Chip, IconButton, InputBase, Container, Stack } from '@mui/material'
import { FiMoreHorizontal } from 'react-icons/fi'

import { PageHeader } from 'widgets'
import { PopupMenu, Spinner } from 'shared/ui'

import { AddButton, AsideTaskInfo, Task } from './ui'
import { getKanbanPopupConfig } from './ui/KanbanPopupConfig'
import { KanbanModel } from './model'

function Kanban() {
  const { t } = useTranslation()
  const [openTaskInfo, setOpenTaskInfo] = useState(false)
  const popupConfig = useMemo(() => getKanbanPopupConfig(), [])

  useEffect(() => {
    KanbanModel.fetch({ id: 1 })
  }, [])

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          py: 6
        }}
      >
        <PageHeader pageName={t('page:kanban')} breadcrumbs={[{ text: 'page:kanban' }]} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 4
          }}
        >
          <DragDropContext
            onDragEnd={(provided) => {
              KanbanModel.onDragEnd(provided)
            }}
          >
            {KanbanModel.loading.has ? (
              <Spinner />
            ) : (
              KanbanModel.columns.map((column) => (
                <Droppable
                  droppableId={String(column.column.position)}
                  key={column.column.position}
                >
                  {(provided) => (
                    <Stack
                      sx={{
                        minWidth: 380,
                        gap: 1
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2
                        }}
                      >
                        <InputBase
                          value={column.column.name}
                          size="small"
                          fullWidth
                          sx={{
                            p: 0.5,
                            pl: 2,
                            backgroundColor: ({ palette }) => palette.background.default,
                            color: ({ palette }) => palette.text.primary,
                            '&:hover': {
                              backgroundColor: ({ palette }) => palette.action.hover,
                              borderRadius: '15px'
                            },
                            '&.Mui-focused': {
                              backgroundColor: ({ palette }) => palette.action.hover,
                              borderRadius: '15px'
                            },
                            '&fieldset': { border: 'none' }
                          }}
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={column.tasks.length}
                            sx={{
                              backgroundColor: ({ palette }) => palette.grey[700]
                            }}
                          />
                          <PopupMenu
                            ActionButton={(btnProps) => (
                              <IconButton
                                {...btnProps}
                                aria-label="settings"
                                sx={{ p: 0.25, fontSize: 18 }}
                              >
                                <FiMoreHorizontal />
                              </IconButton>
                            )}
                            id={column.column.id}
                            config={popupConfig}
                          />
                        </Box>
                      </Box>

                      <Paper
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          p: 2,
                          gap: 2
                        }}
                      >
                        {column.tasks.map((task, id) => (
                          <Draggable key={task.id} draggableId={String(task.id)} index={id}>
                            {(provided, snapshot) => (
                              <Task
                                provided={provided}
                                snapshot={snapshot}
                                task={task}
                                handleOpenTaskInfo={() => {
                                  setOpenTaskInfo(true)
                                }}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <AddButton text="user:actions.addTask" />
                      </Paper>
                    </Stack>
                  )}
                </Droppable>
              ))
            )}
            <AddButton text="user:actions.addColumn" />
          </DragDropContext>
        </Box>
      </Container>

      <AsideTaskInfo
        openTaskInfo={openTaskInfo}
        onCloseTaskInfo={() => {
          setOpenTaskInfo(false)
        }}
      />
    </>
  )
}

export default observer(Kanban)
