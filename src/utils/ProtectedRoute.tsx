import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/header'
import { User } from '../types/User'
import api from '../hooks/api'
import { useAuth } from '../context/userContext'

export function ProtectedRoute({ user }: { user: User | null | undefined }) {
  const { setUser } = useAuth()
  const navigateTo = useNavigate()

  useEffect(() => {
    if (!user) {
      api
        .get('/users/me')
        .then((response) => {
          if (!response.data) navigateTo('/sign-in')
          setUser(response.data)
        })
        .catch((err) => console.log(err))
    }
  }, [])

  return <Header />
}
