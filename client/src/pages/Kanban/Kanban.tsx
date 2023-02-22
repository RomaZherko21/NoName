import { useState } from 'react'
import { Box, Paper, Chip, IconButton, InputBase } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { FiMoreHorizontal } from 'react-icons/fi'

import { PageHeader } from 'widgets'
import { Column } from 'shared/types'

import { AddButton, Task } from './ui'

const columnsFromBackend: Column[] = [
  {
    id: '1',
    title: 'Todo',
    tasks: [
      { task_id: '1', content: 'First task' },
      { task_id: '2', content: 'Second task' },
    ],
  },
  {
    id: '2',
    title: 'In progress',
    tasks: [
      { task_id: '3', content: 'Three task' },
      { task_id: '4', content: 'Four task' },
    ],
  },
  {
    id: '3',
    title: 'Done',
    tasks: [],
  },
]

function Kanban() {
  const { t } = useTranslation()
  const [columns, setColumns] = useState(columnsFromBackend)

  function onDragEnd(result: DropResult) {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn: Column = columns.filter((item) => source.droppableId === item.id)[0]
      const destinationColumn: Column = columns.filter(
        (item) => destination.droppableId === item.id
      )[0]
      const sourceItems = [...sourceColumn.tasks]
      const destinationItems = [...destinationColumn.tasks]
      const [removed] = sourceItems.splice(source.index, 1)
      destinationItems.splice(destination.index, 0, removed)
      setColumns(
        columns.map((item) => {
          if (item.id === source.droppableId) {
            return { ...sourceColumn, tasks: sourceItems }
          } else if (item.id === destination.droppableId) {
            return { ...destinationColumn, tasks: destinationItems }
          } else {
            return item
          }
        })
      )
    } else {
      const column: Column = columns.filter((item) => source.droppableId === item.id)[0]
      const copiedItems = [...column.tasks]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns(
        columns.map((item) => {
          if (item.id !== source.droppableId) {
            return item
          } else {
            return { ...column, tasks: copiedItems }
          }
        })
      )
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column ',
        mt: '40px',
        p: '24px',
        gap: 2,
      }}
    >
      <PageHeader pageName={t('page:kanban')} breadcrumbs={[{ text: 'page:kanban' }]} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          flexGrow: 1,
          gap: 4,
        }}
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {columns.map((column) => {
            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '380px',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <InputBase
                          value={column.title}
                          size="small"
                          fullWidth
                          sx={{
                            p: 0.5,
                            pl: 2,
                            backgroundColor: (theme) => theme.palette.background.default,
                            color: (theme) => theme.palette.text.primary,
                            '&:hover': {
                              backgroundColor: (theme) => theme.palette.action.hover,
                              borderRadius: '15px',
                            },
                            '&.Mui-focused': {
                              backgroundColor: (theme) => theme.palette.action.hover,
                              borderRadius: '15px',
                            },
                            '& fieldset': { border: 'none' },
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={column.tasks.length}
                            sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
                          />
                          <IconButton>
                            <FiMoreHorizontal />
                          </IconButton>
                        </Box>
                      </Box>

                      <Paper
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          p: '24px',
                          gap: 2,
                        }}
                      >
                        {column.tasks.map((task, id) => (
                          <Draggable key={task.task_id} draggableId={task.task_id} index={id}>
                            {(provided, snapshot) => (
                              <Task provided={provided} snapshot={snapshot} task={task} />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <AddButton text="user:actions.addTask" />
                      </Paper>
                    </Box>
                  )
                }}
              </Droppable>
            )
          })}
          <AddButton text="user:actions.addColumn" />
        </DragDropContext>
      </Box>
    </Box>
  )
}

export default observer(Kanban)
