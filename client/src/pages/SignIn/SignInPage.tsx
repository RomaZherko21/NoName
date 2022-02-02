import { observer } from 'mobx-react-lite'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useRootStore } from 'stores/Root'

const SignInPage = () => {
  const { authorization } = useRootStore()

  const handleSubmit = () => {
    authorization.signIn()
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              authorization.name = e.target.value
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              authorization.password = e.target.value
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          {authorization.name}
          {authorization.password}
        </Box>
      </Box>
    </Container>
  )
}

export default observer(SignInPage)
