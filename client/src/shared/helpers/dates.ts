import { format, parse } from 'date-fns'

export const fromMsToDate = (milliseconds: number) => new Date(milliseconds)

export const reformatDates = (
  date: string,
  prevFormat = 'yyyy-mm-dd',
  currentFormat = 'dd.mm.yyyy'
) => format(parse(date, prevFormat, new Date()), currentFormat)
