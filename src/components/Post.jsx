import { useState } from 'react'
import { Favorite, FavoriteBorder, MoreVert, Share, ChatBubbleOutline, Bookmark, BookmarkBorder } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from '@mui/material'

const Post = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const open = Boolean(anchorEl)

  const handleLike = async () => {
    setIsLiked((val) => !val)
  }
  const handleSave = async () => {
    setIsSaved((val) => !val)
  }

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="avatar">
            R
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="save" onClick={handleSave}>
              {isSaved ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
            <IconButton aria-label="settings" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVert />
            </IconButton>
          </>
        }
        title="John Doe"
        subheader="September 14, 2022"
      />
      <CardMedia
        component="img"
        height="20%"
        image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'end' }}>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton aria-label="comments">
          <ChatBubbleOutline />
        </IconButton>
        <IconButton aria-label="like" onClick={handleLike}>
          {isLiked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
      <Menu
        id="post-menu"
        aria-labelledby="post-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem>Add to favorites</MenuItem>
        <MenuItem>Show Profile</MenuItem>
        <MenuItem>Delete Post</MenuItem>
      </Menu>
    </Card>
  )
}

export default Post
