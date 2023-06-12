import { Box } from '@mui/material'
import { format } from 'date-fns'

interface Props {
  day: Date
  currentMonth: string
  onOpenModal: () => void
}

function CalendarItem({ day, currentMonth, onOpenModal }: Props) {
  const isToday = new Date().toDateString() === day.toDateString()

  const isCurrentMonth = format(day, 'MMM-yyyy') === currentMonth

  return (
    <Box
      sx={{
        border: '1px solid grey',
        cursor: 'pointer',
        height: 150,
        width: '14.28%',
        textAlign: 'right',
        p: 2,
        background: ({ palette }) => (isToday ? palette.primary.dark : '#1C2536'),
        color: ({ palette }) => (isCurrentMonth ? palette.grey[100] : palette.grey[500])
      }}
      onClick={() => {
        onOpenModal()
      }}
    >
      {format(day, 'd')}
      {/* <Box
        sx={{
          background: ({ palette }) => palette.primary.dark,
          borderRadius: 0.7,
          cursor: 'pointer'
        }}
      >
        <Typography sx={{ textAlign: 'left' }}>12а English</Typography>
      </Box> */}
    </Box>
  )
}
export default CalendarItem
