import { Grid } from '@mui/material'
import { observer } from 'mobx-react-lite'

interface Props {
  config: {
    key: string
    Control: (arg: any) => JSX.Element
    placeholder: string
  }[]
  setFilters: (pre: any) => void
}

const Filters = ({ config, setFilters }: Props) => {
  return (
    <Grid container spacing={1} style={{ marginTop: '20px' }}>
      {config.map((item) => (
        <Grid item>
          <item.Control
            placeholder={item.placeholder}
            onChange={(e: any) => {
              setFilters((pre: any) => ({ ...pre, [item.key]: e.target.value }))
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default observer(Filters)
