import { observer } from 'mobx-react-lite'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ReactElement } from 'react'

const CommonTable = ({ bodyRows, additionalColumns = [] }: any) => {
  const headerRow = Object.keys(bodyRows[0])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {headerRow.map((row) => (
              <TableCell key={row} align="right">
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyRows.map((row: any) => (
            <TableRow key={row.name}>
              {Object.entries(row).map(([key, value]: any) => (
                <TableCell key={key} align="right">
                  {value}
                </TableCell>
              ))}
              {additionalColumns.length &&
                additionalColumns.map((item: ReactElement) => item)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default observer(CommonTable)
