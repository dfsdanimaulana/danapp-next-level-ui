import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
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
import { registerSchema } from '../validations'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        DanApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Register() {
  const { user, status, register } = useAuth()
  const [passwordShow, setPasswordShow] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: joiResolver(registerSchema)
  })

  const onSubmit = (formBody) => {
    const { confirm_password, ...data } = formBody
    register(data)
  }

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
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name"
                    autoFocus
                    autoComplete="off"
                    error={!!errors.name}
                    helperText={errors.name && errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email && errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
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
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Confirm Password"
                    type={passwordShow ? 'text' : 'password'}
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password && errors.confirm_password?.message}
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
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button> */}
          <LoadingButton
            type="submit"
            color="info"
            variant="contained"
            fullWidth
            loading={status === 'loading'}
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography component="span">Already have an account?</Typography> <Link to="/login">Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
