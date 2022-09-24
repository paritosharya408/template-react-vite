import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { User } from '../../types/User'
import api from '../../hooks/api'
import { useAuth } from '../../context/userContext'
import { TextField } from '../../components/text-field'
import styles from './Signup.module.css'
import { Button } from '../../components/button'

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
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.header}>Log in</h2>
        <div className="form">
          <TextField
            value={userInputs.email}
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
          <TextField
            value={userInputs.name}
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Name"
          />
          <TextField
            value={userInputs.password}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <Button onClick={registerUser}>Log in</Button>
          <p>
            Already have an account? <a href="/sign-in">Log in here</a>
          </p>
        </div>
      </div>
    </div>
  )
}
