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
  const handleChange = (event: { target: { name: string; value: string } }) => {
    console.log('aa')
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
          />
          <TextField
            value={userInputs.password}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <Button onClick={loginUser}>Log in</Button>
          <p>
            Dont have an account? <a href="/sign-up">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  )
}
