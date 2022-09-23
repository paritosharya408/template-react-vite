import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Outlet, useNavigate } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import MessageIcon from '@mui/icons-material/Message'
import { Drawer, AppBar, DrawerHeader, NavItemWrapper } from './styled'
import { useAuth } from '../../context/userContext'
import api from '../../hooks/api'

export function Header() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const navigateTo = useNavigate()
  const { setUser } = useAuth()
  const navItems = [
    { name: 'Conversations', path: '/conversations' },
    { name: 'Friends', path: '/friends' },
    { name: 'Settings', path: '/settings' },
  ]
  const getIcon = (path: string) => {
    if (path === '/conversations') {
      return <MessageIcon />
    }
    if (path === '/friends') {
      return <Diversity1Icon />
    }
    return <SettingsIcon />
  }

  const logout = async () => {
    try {
      await api.post('/users/logout')
      setUser(null)
      navigateTo('/sign-in')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <NavItemWrapper>
            <Typography variant="h6" noWrap component="div">
              ChatApp
            </Typography>
            <Typography
              onClick={logout}
              variant="button"
              sx={{ cursor: 'pointer' }}
              noWrap
              component="div"
            >
              Logout
            </Typography>
          </NavItemWrapper>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem
              onClick={() => navigateTo(item.path)}
              key={item.name}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {getIcon(item.path)}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" className="main-wrapper" sx={{ flexGrow: 1, p: 1 }}>
        <div className="page-wrapper">
          <Outlet />
        </div>
      </Box>
    </Box>
  )
}
