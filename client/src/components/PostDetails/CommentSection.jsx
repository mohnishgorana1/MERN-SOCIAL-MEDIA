import useStyles from './styles'
import {useDispatch} from 'react-redux'
import { Typography, TextField, Button } from '@material-ui/core'
import { useRef, useState } from 'react'


function CommentSection({post}) {
    console.log(post);

    const classes = useStyles();
    const [comments, setComments] = useState([])

  return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {
                    comments.map((comment, i) => [
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            Comment {i}
                        </Typography>
                    ])
                }
            </div>
        </div>
    </div>
  )
}

export default CommentSection