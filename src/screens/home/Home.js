import React, { Component } from "react";
import "./Home.css";
import Header from '../../common/header/Header'
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Moment from 'react-moment';

const styles = theme => ({
  card: {
    maxWidth: 400
  },

  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  root: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    flexWrap: "wrap",
    marginLeft: 200
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  textField: {
    marginLeft: 0,
    marginRight: 0,
    width: 300
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  bigAvatar: {
    margin: 5,
    width: 60,
    height: 60
  },
  icon: {
    color: "#b20505"
  },
  test: {
    fontSize: 14
  },
  button: {
    marginTop: 23,
    width: 50,
    marginLeft: 20
  },
  gridList: {
    width: 2000,
    height: "auto"
  },
  
});

class Home extends Component {
  constructor() {
    super();

    this.state = {
      date: "",
      apidata: [],
      favColor: 0,
      commentFlag: 0,
      count: 0,
      id:[0,0,0,0,0,0,0,0,0,0,0,0],
      comments:[]
    };
  }

  componentWillMount() {
    let that = this;

    let xhr = new XMLHttpRequest();
    let newState;
    xhr.open(
      "GET",
      "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784"
    );
    //     xhr.setRequestHeader('Cache-Control',"no-cache");
    xhr.send();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        newState = that.state;
        newState.apidata = JSON.parse(this.responseText).data;
        that.setState(newState);       
       }
    };

 
  }

  fillColorHandler = (imageCount,imageId)  => {
    let newState=this.state;
    let that=this
    newState.apidata.map(function(dat){
      if(dat.id===imageId){
      
       dat.likes.count+=1;
       newState.id[imageCount]=1;
       that.setState(newState);     
     }      
      }
    );
    
  //  this.setState(newState);
   
  };
  outlineColorHandler = (imageCount,imageId) => {
    let newState=this.state;
    
    let that=this
    newState.apidata.map(function(dat){
      if(dat.id===imageId){
      
        dat.likes.count-=1;
        newState.id[imageCount]=0
       that.setState(newState);
     
      
     }     
  })}

  commentHandler = (e, value) => {
    let comments = this.state.comments
    comments.push(e.target.value )
    this.setState({ comments: comments });    
  };
  putComment = (e) => {
    e.preventDefault();
    this.setState({ commentFlag: 1 });
  };

  captionText = value => {
    let text = value.split("\n");
    return (
        <div>
          <Typography component="p">{text[0]}</Typography>
          <Typography variant="subtitle2" color="primary">{text[1]}</Typography>
      </div>
      
      
      )
}

  render() {
    const { classes } = this.props;
    let apidata = this.state.apidata;
   
    return (
      <div>
		<Header showSearch="false" showProfile="true"/>
        <br />
        <br />
        <div className={classes.root}>
        <GridList cellHeight={600} cols={2} className={classes.gridList}> 
            {apidata.map(val => (                             
              <GridListTile className="gridtile" key={val.id}>
                <Card className={classes.card} key={val.id} >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="upgrad"
                        src={val.user.profile_picture}
                        className={classes.bigAvatar}
                      />
                    }
                    title={val.user.username}
                    subheader={<Moment format="DD/MM/YYYY HH:mm" unix>{val.caption.created_time}</Moment>}
                  />
                  <CardMedia
                    className={classes.media}
                    image={val.images.standard_resolution.url}
                    title={val.caption.text}
                  />
                  <CardContent>
                      {this.captionText(val.caption.text)}
                  </CardContent>
                  <CardActions>
                    { this.state.id[val.likes.count-1] === 0 && (

                      <IconButton
                        onClick={this.fillColorHandler.bind(this,val.likes.count,val.id)}
                        aria-label="Add to favorites"
                        key={val.id}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    )}
                    {  this.state.id[val.likes.count-1] === 1 && (

                      <IconButton
                        onClick={this.outlineColorHandler.bind(this,val.likes.count,val.id)}
                        aria-label="Add to favorites"
                        style={{ color: "#b20505" }}
                      >
                        <Favorite />
                      </IconButton>
                    )}
                    <Typography className={classes.test}>
                      {val.likes.count} likes
                    
                    </Typography>
                  </CardActions>
                  {this.state.commentFlag === 1 && (
                    <Typography className={classes.test}>
                     <span>{this.state.comments}</span>
                    </Typography>
                  )}
                  <form className="subscriber-form" onSubmit={this.putComment.bind(this)}>
                    <TextField
                      label="Add a comment"
                      className={classes.textField}
                      margin="normal"
                      onChange={this.commentHandler}
                      defaultValue=""
                    />
                 
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.putComment}
                    >
                      ADD
                    </Button>
                  </form>
                </Card>
              </GridListTile>
             
            ))}
            </GridList>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
