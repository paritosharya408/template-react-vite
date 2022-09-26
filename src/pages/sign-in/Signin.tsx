import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types/User'
import api from '../../hooks/api'
import { useAuth } from '../../context/userContext'
import styles from './Signin.module.css'
import { TextField } from '../../components/text-field'
import { Button } from '../../components/button'

export function Signin() {
  const navigateTo = useNavigate()
  const { setUser, user } = useAuth()
  const [userInputs, setUserInputs] = useState<User>({
    email: '',
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

  const loginUser = async () => {
    try {
      const { email, password } = userInputs
      if (!email || !password) {
        return setError('Field is required.')
      }
      const response = await api.post('/users/sign-in', userInputs)
      setUser(response.data)
      navigateTo('/')
    } catch (error) {
      console.error(error)
    }
  }
  const handleChange = (event: { target: { name: string; value: string } }) => {
    setUserInputs({ ...userInputs, [event.target.name]: event.target.value })
  }
  return (
    <div className={styles.container}>
      <div className={`${styles.card} bg-1`}>
        <h2 className={styles.header}>Log in</h2>
        <form className="form">
          <TextField
            value={userInputs.email}
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
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
          <Button onClick={loginUser}>Log in</Button>
          <p>
            Dont have an account? <a href="/sign-up">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  )
}
