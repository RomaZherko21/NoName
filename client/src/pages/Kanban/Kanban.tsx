import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Box, Paper, Chip, IconButton, InputBase, Container } from '@mui/material'
import { FiMoreHorizontal } from 'react-icons/fi'

import { PageHeader } from 'widgets'
import { KanbanColumn } from 'shared/types'

import { AddButton, Task } from './ui'

const columnsFromBackend: KanbanColumn[] = [
  {
    id: '1',
    title: 'Todo',
    tasks: [
      { id: '1', content: 'First task' },
      { id: '2', content: 'Second task' },
    ],
  },
  {
    id: '2',
    title: 'In progress',
    tasks: [
      { id: '3', content: 'Three task' },
      { id: '4', content: 'Four task' },
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

  function onDragEnd({ source, destination }: DropResult) {
    if (!destination) return

    if (source.droppableId !== destination.droppableId) {
      const fromColumn = columns.find((item) => source.droppableId === item.id)
      const toColumn = columns.find((item) => destination.droppableId === item.id)

      if (fromColumn && toColumn) {
        const fromTasks = [...fromColumn.tasks]
        const toTasks = [...toColumn.tasks]
        const [removed] = fromTasks.splice(source.index, 1)

        toTasks.splice(destination.index, 0, removed)

        setColumns(
          columns.map((column) => {
            if (column.id === source.droppableId) {
              return { ...fromColumn, tasks: fromTasks }
            } else if (column.id === destination.droppableId) {
              return { ...toColumn, tasks: toTasks }
            } else {
              return column
            }
          })
        )
      }
    } else {
      const column = columns.find((item) => source.droppableId === item.id)

      if (column) {
        const fromTasks = [...column.tasks]
        const [removed] = fromTasks.splice(source.index, 1)

        fromTasks.splice(destination.index, 0, removed)

        setColumns(
          columns.map((column) => {
            if (column.id === source.droppableId) {
              return { ...column, tasks: fromTasks }
            } else {
              return column
            }
          })
        )
      }
    }
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 6,
      }}
    >
      <PageHeader pageName={t('page:kanban')} breadcrumbs={[{ text: 'page:kanban' }]} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 4,
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 380,
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
                        backgroundColor: ({ palette }) => palette.background.default,
                        color: ({ palette }) => palette.text.primary,
                        '&:hover': {
                          backgroundColor: ({ palette }) => palette.action.hover,
                          borderRadius: '15px',
                        },
                        '&.Mui-focused': {
                          backgroundColor: ({ palette }) => palette.action.hover,
                          borderRadius: '15px',
                        },
                        '&fieldset': { border: 'none' },
                      }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={column.tasks.length}
                        sx={{ backgroundColor: ({ palette }) => palette.grey[700] }}
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
                      p: 2,
                      gap: 2,
                    }}
                  >
                    {column.tasks.map((task, id) => (
                      <Draggable key={task.id} draggableId={task.id} index={id}>
                        {(provided, snapshot) => (
                          <Task provided={provided} snapshot={snapshot} task={task} />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <AddButton text="user:actions.addTask" />
                  </Paper>
                </Box>
              )}
            </Droppable>
          ))}
          <AddButton text="user:actions.addColumn" />
        </DragDropContext>
      </Box>
    </Container>
  )
}

export default observer(Kanban)
