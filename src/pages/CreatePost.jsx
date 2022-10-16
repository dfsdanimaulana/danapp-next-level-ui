import { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { MoreVert } from '@mui/icons-material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import useAuth from '../hooks/useAuth'
import useImagePreview from '../hooks/useImagePreview'
import Layout from '../components/Layout'
import { createPostSchema } from '../validations'

export default function CreatePost() {
  const { user } = useAuth()
  const inputRef = useRef()
  const { preview, onSelectFile } = useImagePreview()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      caption: '',
      image: null,
      hashtag: ''
    },
    resolver: joiResolver(createPostSchema)
  })

  const handleFileChange = (event) => {
    onSelectFile(event)
    console.log(event.target.files[0])
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Layout>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        flex={6}
        p={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Box mt={5} flex={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="300"
              image={
                preview ||
                'https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              }
              alt="Upload"
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <input ref={inputRef} type="file" hidden onChange={handleFileChange} />
              <Button
                variant="contained"
                color="success"
                onClick={() => inputRef.current.click()}
                startIcon={<AddPhotoAlternateIcon />}
              >
                Choose File
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Box flex={1} p={3}>
          <Stack direction="row" alignItems="center" py={2} mb={3} spacing={2}>
            <Avatar alt="user" />
            <Typography flex={1} component="span">
              {user?.name}
            </Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Stack>
          <Stack spacing={2}>
            <Controller
              name="caption"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  label="Caption"
                  rows={4}
                  error={!!errors.caption}
                  helperText={errors.caption ? errors.caption?.message : ' '}
                />
              )}
            />
            <Controller
              name="hashtag"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth label="Hashtag" helperText="Separate by space" />}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Add location">
              <IconButton>
                <AddLocationAltIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Tag account">
              <IconButton>
                <PersonAddAlt1Icon color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Upload video">
              <IconButton>
                <VideoCallIcon color="success" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'end', m: 3 }}>
            <LoadingButton type="submit" color="info" variant="contained" loading={false} sx={{ px: 5 }}>
              Post
            </LoadingButton>
          </Box>
        </Box>
      </Stack>
    </Layout>
  )
}
