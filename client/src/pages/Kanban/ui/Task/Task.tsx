import { Box, Paper, Chip, CardMedia, Typography, Avatar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { ImFilePicture } from 'react-icons/im'
import { BsEye } from 'react-icons/bs'
import { AiOutlineMessage } from 'react-icons/ai'

import primerImg from 'shared/assets/images/cover.jpg'
import { Task as TypeTask } from 'shared/types'

interface Props {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  task: TypeTask
}

function Task({ provided, snapshot, task }: Props) {
  return (
    <Paper
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: '24px',
        gap: 2,
        backgroundColor: (theme) => (snapshot.isDragging ? theme.palette.action.hover : '#1c2536'),
        '&:hover': {
          backgroundColor: (theme) => theme.palette.action.hover,
        },
        ...provided.draggableProps.style,
        userSelect: 'none',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          sx={{
            alignSelf: 'center',
            height: '140px',
            width: '300px',
            borderRadius: '20px',
            mb: 1,
          }}
          image={primerImg}
          title="task cover"
        />
        <Typography variant="subtitle1">{task.content}</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          size="small"
          label="Business"
          sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: (theme) => theme.palette.grey[600],
          }}
        >
          <BsEye size={24} />
          <ImFilePicture size={24} />
          <AiOutlineMessage size={24} />
        </Box>
        <Avatar
          sx={{ height: '40px', width: '40px' }}
          // src={`${API_USER_AVATAR_URL}/${user.avatar}`}
        />
      </Box>
    </Paper>
  )
}

export default observer(Task)
