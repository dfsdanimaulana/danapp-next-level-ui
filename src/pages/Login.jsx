import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import useAuth from '../hooks/useAuth'
import { loginSchema } from '../validations'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
        DanApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Login() {
  const { user, status, login } = useAuth()
  const [passwordShow, setPasswordShow] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: joiResolver(loginSchema)
  })

  const onSubmit = (data) => login(data)

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          DanApp
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Email Address"
                type="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email && errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Password"
                autoComplete="current-password"
                type={passwordShow ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password && errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start" onClick={() => setPasswordShow((val) => !val)}>
                      {passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button> */}
          <LoadingButton
            type="submit"
            color="info"
            variant="contained"
            fullWidth
            loading={status === 'loading'}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Typography component="span">Don't have an account?</Typography> <Link to="/register">Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
