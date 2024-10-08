import { Box, Paper, Chip, CardMedia, Typography, Avatar, AvatarGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { ImFilePicture } from 'react-icons/im'
import { BsEye } from 'react-icons/bs'
import { AiOutlineMessage } from 'react-icons/ai'

import { KanbanTask as TypeTask } from 'shared/types'
import { API_KANBAN_IMAGES_URL, API_USER_AVATAR_URL } from 'shared/consts'
import { KanbanModel } from 'pages/Kanban/model'
interface Props {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  task: TypeTask
  handleOpenTaskInfo: () => void
}

function Task({ provided, snapshot, task, handleOpenTaskInfo }: Props) {
  function onAsideOpenHandler() {
    handleOpenTaskInfo()
    KanbanModel.fetchTask({ id: task.id })
  }

  return (
    <Paper
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      elevation={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 2,
        backgroundColor: (theme) =>
          snapshot.isDragging ? theme.palette.action.hover : 'background.rare',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.action.hover
        },
        ...provided.draggableProps.style,
        userSelect: 'none'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          sx={{
            alignSelf: 'center',
            height: 140,
            width: '100%',
            borderRadius: 2,
            mb: 1
          }}
          onClick={onAsideOpenHandler}
          image={task.attachments && `${API_KANBAN_IMAGES_URL}/${task.attachments[0]}`}
          title="task cover"
        />
        <Typography onClick={onAsideOpenHandler} variant="subtitle1">
          {task.name}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {task.tags.map((tag, id) => (
          <>
            {tag && (
              <Chip
                key={id}
                size="small"
                label={tag}
                sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
              />
            )}
          </>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            color: (theme) => theme.palette.grey[600],
            fontSize: 18
          }}
        >
          <BsEye />
          <ImFilePicture />
          <AiOutlineMessage />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <AvatarGroup>
            {task.assigne_to?.slice(0, 3)?.map((user_img, id) => (
              <Avatar
                key={id}
                sx={{ width: 32, height: 32 }}
                src={`${API_USER_AVATAR_URL}/${user_img}`}
              ></Avatar>
            ))}
          </AvatarGroup>
        </Box>
      </Box>
    </Paper>
  )
}

export default observer(Task)
