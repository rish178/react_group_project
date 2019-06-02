import React from 'react';
import './image-posts.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Favorite from "@material-ui/icons/Favorite";

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    image: {
      width: '450px',
      height: '450px',
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: 210
    },
    button: {
        marginTop: 30,
        width: 50,
        marginLeft: 5
    }
  });

class ImagePosts extends React.Component{

    constructor(){
        super();
        this.state = {
            imagePosts : [],
            openOrCloseModal:false,
            imageURL:'',
            alt:'',
            profilePicture:'',
            userName:'',
            caption:'',
            hashTags:'',
            likesCount:0,
            likeIndicatorStatusFlag:0,
            likeIndicatorStatusStyle:{},
            comments:[],
            currentComment:''
        }
        this.imageMediaURL = 'https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784';
    }

    appendHashTag = (values) => {
        let hashedTags = values.map(item => (
            '#'+item
        ));        
        let hashedTagString = hashedTags.join(' ');
        return hashedTagString;
    }

    removeHashTags = (value) => {
        let cpationString = value.split("\n");
        return cpationString[0];
    }

    likeIndicatorStatusChangeHandler = () => {
        this.setState((prevState) => {            
            if(prevState.likeIndicatorStatusFlag === 0){
                return { likeIndicatorStatusFlag: 1,likeIndicatorStatusStyle :{ color: "#b20505" },likesCount:prevState.likesCount+1};
            }else{
                return { likeIndicatorStatusFlag: 0,likeIndicatorStatusStyle :{},likesCount:prevState.likesCount-1};
            }
        })
    }

    setCommentHandler = (cmnt) => {        
        this.setState({currentComment:cmnt.target.value});
    }

    addCommentHandler = () => {
        if(this.state.currentComment !== '') {
            this.setState({comments:this.state.comments.concat(this.state.currentComment),currentComment:''});
        }
    }

    componentWillMount() {
        let _context = this;        
        let xhrImagePosts = new XMLHttpRequest();
        xhrImagePosts.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let imageMediaData = JSON.parse(this.responseText);
                var imagePostsData = imageMediaData.data.map(item => (
                    {
                        id:item.id
                        ,imgURL: item.images.standard_resolution.url
                        ,alt:item.caption.text
                        ,profile_pic:item.user.profile_picture
                        ,username:item.user.username
                        ,caption:_context.removeHashTags(item.caption.text)
                        ,hashtags:_context.appendHashTag(item.tags)
                        ,likesCount:item.likes.count                        
                    }
                ));
                _context.setState({
                    imagePosts:imagePostsData
                })                
            }
        });

        xhrImagePosts.open("GET", this.imageMediaURL);
        xhrImagePosts.send();
    }

    openModalHandler = (imgData) => {
        this.setState({
            openOrCloseModal:true,
            imageURL:imgData.imgURL,
            alt:imgData.alt,
            profilePicture:imgData.profile_pic,
            userName:imgData.username,
            caption:imgData.caption,
            hashTags:imgData.hashtags,
            likesCount:imgData.likesCount,
            likeIndicatorStatusFlag:0,
            likeIndicatorStatusStyle:{},
            comments:[]
        });
    }

    closeModalHandler = () => {
        this.setState({
            openOrCloseModal:false
        });
    }

        
    render(){ 
        const { classes } = this.props;       
        return(
            <div className='impo-main-container'>
                <Modal open={this.state.openOrCloseModal}
                    aria-labelledby="simple-modal-title"
                    onClose={this.closeModalHandler}
                >
                    <div className='modal-size-img-post'>
                    
                        <div className='modal-img-post-main-cntnr'>
                            <div className='modal-img-post'>
                                <img className='modal-img-post-url' alt="complex" src={this.state.imageURL} />

                            </div> 
                            <div className='modal-img-post-info'>
                                <div className='modal-img-post-user-info'>
                                    <div><img className='modal-img-post-prof-pic' alt='profile_pic' src={this.state.profilePicture} /></div>
                                    <div className='modal-img-post-uname'>{this.state.userName}</div>
                                </div>
                                <div className='modal-img-post-user-info-divider'>
                                    <Divider />
                                </div>
                                <div className='modal-img-post-user-info-captions'>
                                    {this.state.caption}
                                </div>
                                <div className='modal-img-post-user-info-hash-tags'>
                                    {this.state.hashTags}
                                </div>
                                <br />
                                <div className='modal-img-post-user-info-comments'>
                                    {this.state.comments.map((comment,index) => (                                        
                                        <div key={index}>
                                            <span className='modal-commnts-uname'>{this.state.userName}: </span>
                                            <span>{comment}</span>
                                        </div>
                                    ))}                                  
                                </div>
                                <div className='modal-img-post-likes-contnr'>
                                    <div>
                                        <IconButton
                                            onClick={this.likeIndicatorStatusChangeHandler}
                                            aria-label="Add to favorites"
                                            key={1}
                                            style={this.state.likeIndicatorStatusStyle}
                                        >
                                            <Favorite />
                                        </IconButton>
                                    </div>
                                    <div className='modal-img-post-likes-counter'>
                                        <Typography className={classes.test}>
                                            {this.state.likesCount} likes
                                            
                                        </Typography>
                                    </div>
                                </div>
                                <div className='modal-img-post-add-comments'>
                                    <form className="add-comment-form">
                                        <TextField
                                            label="Add a comment"
                                            className={classes.textField}
                                            margin="normal"
                                            onChange={this.setCommentHandler}
                                            value={this.state.currentComment}
                                        />                                
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={this.addCommentHandler}
                                        >
                                        ADD
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>    
                    
                    </div>
                </Modal>
                <GridList cols={3} >
                    {this.state.imagePosts.map(imgPost => (
                        <GridListTile key={imgPost.id}>
                            <img src={imgPost.imgURL} className="movie-poster" alt={imgPost.alt} onClick={this.openModalHandler.bind(this,imgPost)} />                            
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
   
}

export default withStyles(styles)(ImagePosts);