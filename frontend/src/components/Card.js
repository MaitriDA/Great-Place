import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {format} from 'timeago.js';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      boxShadow:"None",
      zIndex:100,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  

const PinCard = ({data}) => {
    const classes = useStyles();

  return <Card className={classes.root}>
  <CardHeader
    avatar={
      <Avatar aria-label="recipe" className={classes.avatar}>
        R
      </Avatar>
    }
    action={
      <IconButton aria-label="settings">
        <FavoriteIcon />
      </IconButton>
    }
    title={data.title}
    subheader={format(data.createdAt)}
  />
  <CardMedia
    className={classes.media}
    image="https://media.istockphoto.com/photos/the-bandraworli-sea-link-mumbai-india-picture-id860528756?k=20&m=860528756&s=612x612&w=0&h=5uau9cXU4jVjW7b9YejARZcRyubZLkMpbIO8HTD93Oc="
    title={data.title}
  />
  <CardContent>
    <Typography variant="body2" color="textSecondary" component="p">{data.description}
    </Typography>
  </CardContent>
</Card>;
};

export default PinCard;

