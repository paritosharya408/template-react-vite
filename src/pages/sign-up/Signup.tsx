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
  const [error, setError] = useState('')

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
      const { email, name, password } = userInputs
      if (!email || !name || !password) {
        return setError('Field is required.')
      }

      await api.post('/users/sign-up', userInputs)
      navigateTo('/sign-in')
      setError('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setUserInputs({ ...userInputs, [event.target.name]: event.target.value })
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
            error={error}
          />
          <TextField
            value={userInputs.name}
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Name"
            error={error}
          />
          <TextField
            value={userInputs.password}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            error={error}
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
