import {
  Button,
  Card,
  TextField,
  styled,
  CardContent,
  Typography,
  Link,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
export function Signin() {
  const navigateTo = useNavigate()
  const { setUser, user } = useAuth()
  const [userInputs, setUserInputs] = useState<User>({
    email: '',
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

  const loginUser = async () => {
    try {
      const response = await api.post('/users/sign-in', userInputs)
      setUser(response.data)
      navigateTo('/')
    } catch (error) {
      console.error(error)
    }
  }
  const handleChange = (event: { target: { id: string; value: string } }) => {
    setUserInputs({ ...userInputs, [event.target.id]: event.target.value })
  }
  return (
    <Container>
      {user && user.email}
      <Card
        sx={{
          width: '450px',
          padding: '16px',
        }}
        variant="outlined"
      >
        <Typography variant="h5">Log in</Typography>
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
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            value={userInputs.password}
            onChange={handleChange}
          />
          <Button onClick={loginUser} size="large" variant="contained">
            Log in
          </Button>
          <p>
            Dont have an account?
            <Link sx={{ marginLeft: '4px' }} href="/sign-up">
              Sign up here.
            </Link>
          </p>
        </CardContent>
      </Card>
    </Container>
  )
}
