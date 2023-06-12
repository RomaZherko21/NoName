import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material'
import { add, endOfMonth, endOfWeek, format, parse, startOfToday, startOfWeek } from 'date-fns'
import { eachDayOfInterval } from 'date-fns/esm'

import { CalendarItem, AddEvent } from './ui'

function Calendar() {
  const { t } = useTranslation()
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(format(startOfToday(), 'MMM-yyyy'))
  const [dayId, setDayId] = useState<Date>()

  let firstDayCurrentMonth = parse(selectedMonth, 'MMM-yyyy', new Date())

  let tableDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth))
  })

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setSelectedMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setSelectedMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  return (
    <>
      <Box sx={{ display: 'flex', mb: 3, pr: 3, pl: 3, justifyContent: 'space-between' }}>
        <Typography variant="h5">{format(firstDayCurrentMonth, 'MMMM yyyy')}</Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <IconButton onClick={previousMonth} sx={{ p: 1, fontSize: 20 }}>
              <BsChevronLeft />
            </IconButton>
            <IconButton onClick={nextMonth} sx={{ p: 1, fontSize: 20 }}>
              <BsChevronRight />
            </IconButton>
          </Box>

          <Button
            onClick={() => {
              setIsAddEventModalOpen(true)
            }}
            color="primary"
            variant="contained"
          >
            {t('calendar:newEvent')}
          </Button>
        </Box>
      </Box>

      <Box>
        <Grid
          component={Paper}
          elevation={2}
          sx={{ width: '100%', mb: 2, background: '#1C2536' }}
          container
        >
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((item) => (
            <Grid item xs={1.7} sx={{ textAlign: 'center', p: 1 }}>
              {t(`calendar:${item}`)}
            </Grid>
          ))}

          <Box sx={{ flexGrow: 1 }}>
            <Grid container flex-wrap="wrap">
              {tableDays.map((day) => (
                <CalendarItem
                  day={day}
                  currentMonth={selectedMonth}
                  onOpenModal={() => {
                    setDayId(day)
                    setIsAddEventModalOpen(true)
                  }}
                />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Box>

      <AddEvent
        dayId={dayId}
        isOpen={isAddEventModalOpen}
        handleClose={() => {
          setIsAddEventModalOpen(false)
        }}
      />
    </>
  )
}

export default Calendar
