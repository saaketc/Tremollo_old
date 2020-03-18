import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
// import ShareIcon from '@material-ui/icons/Share';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// video player
import VideoPlayer from './../videoPlayer';
import { thumbnailCreator, month } from '../../utils/utilfunctions';
import UImodalDemo from './UImodalDemo';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
const color = 'red';
export default function UIcard({pageName, description, date, url, userId}) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [follow, setFollow] = React.useState(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleLikeClick = () => {
         setLike(!like);
    }
    const handleFollowClick = (pageName) => {
        setFollow(!follow);
        !follow ? toast.error(`Subscribed to ${pageName} Studio`) : toast.error(`Unsubscribed ${pageName} Studio`);
    }
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {thumbnailCreator(pageName)}
          </Avatar>
                }
              
               
                action={
                    <IconButton aria-label="join">
                        <AudiotrackRoundedIcon style={{color: follow ? color : '', fontSize:'40px'}}onClick={()=>handleFollowClick(pageName)}/>
                    </IconButton>
                   
                } 
                title={pageName}
                subheader={` ${month(new Date(date).getMonth())} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`}
            />
            {/* <CardMedia
                className={classes.media}
                component={VideoPlayer}
                url={url}
            /> */}
            <VideoPlayer
                url={url} />
            
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                   {description}
        </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={handleLikeClick} style= {{ color:like ? color : ''   }} />
                </IconButton>
                {/* <IconButton aria-label="add to playlist">
                   <LibraryAddIcon/>
                </IconButton> */}
                <UImodalDemo
                   userId={userId}
                />
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                   
                </IconButton>
            </CardActions>
          
        </Card>
    );
}