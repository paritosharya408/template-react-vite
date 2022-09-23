import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  TextField,
  styled,
  CardContent,
  Typography,
  Link,
} from '@mui/material'
import { User } from '../../types/User'
import api from '../../hooks/api'
import { useAuth } from '../../context/userContext'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
export function Signup() {
  const navigateTo = useNavigate()
  const { user } = useAuth()
  const [userInputs, setUserInputs] = useState<User>({
    email: '',
    name: '',
    password: '',
  })

  useEffect(() => {
    if (!user) {
      api
        .get('/users/me')
        .then((response) => {
          if (response.data) navigateTo('/')
        })
        .catch((err) => console.log(err))
    }
  }, [])

  const registerUser = async () => {
    try {
      await api.post('/users/sign-up', userInputs)
      navigateTo('/sign-in')
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: { target: { id: string; value: string } }) => {
    setUserInputs({ ...userInputs, [event.target.id]: event.target.value })
  }

  return (
    <Container>
      <Card
        sx={{
          width: '450px',
          padding: '16px',
        }}
        variant="outlined"
      >
        <Typography variant="h5">Sign up</Typography>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            sx={{ marginBottom: '16px' }}
            required
            id="email"
            label="Email"
            variant="outlined"
            value={userInputs.email}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginBottom: '16px' }}
            required
            id="name"
            label="Name"
            variant="outlined"
            value={userInputs.name}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginBottom: '16px' }}
            required
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            value={userInputs.password}
            onChange={handleChange}
          />
          <Button onClick={registerUser} size="large" variant="contained">
            Sign up
          </Button>
          <p>
            Already have an account?
            <Link sx={{ marginLeft: '4px' }} href="/sign-in">
              Log in here.
            </Link>
          </p>
        </CardContent>
      </Card>
    </Container>
  )
}
