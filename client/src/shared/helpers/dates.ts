import { format, parse, parseISO } from 'date-fns'
import { DEFAULT_TIMESTAMP_FORMAT } from 'shared/consts'

export const fromMsToDate = (milliseconds: number) => new Date(milliseconds)

export const fromTimestampToDate = (date = '', viewFormat = DEFAULT_TIMESTAMP_FORMAT) => {
  if (date && typeof date === 'string') {
    return format(parseISO(date), viewFormat)
  }

  return 'Invalid date'
}

export const reformatDates = (
  date: string,
  prevFormat = 'yyyy-mm-dd',
  currentFormat = 'dd.mm.yyyy'
) => format(parse(date, prevFormat, new Date()), currentFormat)
