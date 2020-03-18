

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import IconButton from '@material-ui/core/IconButton';
import { thumbnailCreator } from '../../utils/utilfunctions';
import Form from './form';

import dataService from '../../services/dataServices';
import { toast } from 'react-toastify';

// const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});
// const play = [
//     { name: 'Classic', playlistId: 1, contents: [] },
//     { name: 'Happiness', playlistId: 2, contents: [] },
//     { name: 'Work life', playlistId: 3, contents: [] },
//     { name: 'Cool', playlistId: 4, contents: [] }
// ]
const fields = [
    { name: 'playlistName', label: 'Playlist name', type: 'text' }
]
const button = { type: 'submit', label: 'Create', color: '#bf2604' };

function UImodal(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open, userId } = props;
    const [playlist, setPlaylist] = React.useState([]);
    
    // React.useEffect(() => { 
    //    //making api call to fetch current user playlist
       
    //     setPlaylist(play);
    // }, []);    
    const handleClose = () => {
        onClose(selectedValue);
    };
    const postSubmitLogic = async (submittedData) => {
        // console.log(submittedData);
        let list = {
            playlistName: submittedData['playlistName'],
            userId: userId
        };
        let oldList = [...playlist];
        // console.log(list);
        try { 
            
            const { data } = await dataService.postData('playlist/create', list);
            // console.log(data.body);
            playlist.unshift(data.body);
        }
        catch (e) {
            toast.error("Ooops something went wrong!");
            setPlaylist(oldList);
        }
}
    const handleListItemClick = value => {
        // onClose(value);
        
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Add to playlist</DialogTitle>
            <List>
                {playlist.map(p => (
                    <ListItem button onClick={() => handleListItemClick(p.name)} key={p.name}>
                        <ListItemAvatar>
                            {/* <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar> */}
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {thumbnailCreator(p.name)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={p.name} />
                    </ListItem>
                ))}

                {/* <ListItem autoFocus button onClick={() => handleListItemClick('createNew')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Create new playlist" />
                </ListItem> */}
                <Form
                    postSubmitLogic={postSubmitLogic}
                    heading=''
                    fields={fields}
                    noIcon={true}
                    button={button} />  
            </List>
        </Dialog>

    );
}

UImodal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function UImodalDemo({userId}) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
           
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
      </Button> */}
            <IconButton aria-label="add to playlist" onClick={handleClickOpen}>
                <LibraryAddIcon />
            </IconButton> 
            <UImodal selectedValue={selectedValue} open={open} onClose={handleClose} userId={userId} />
        </div>
    );
}