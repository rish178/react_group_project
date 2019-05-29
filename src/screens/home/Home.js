import React , {Component} from 'react';
import Header from '../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Favorite from '@material-ui/icons/Favorite';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
//import Time from 'react-time';

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    textField: {
      marginLeft:0 ,
      marginRight: 0,
      width: 300,
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    bigAvatar: {
      margin: 5,
      width: 60,
      height: 60,
    },
    icon:{
        color: "#b20505",
    },
    test : {
   
        fontSize : 14,
    },
    button: {
      marginTop: 23,
      width : 50,
      marginLeft:20
    },
  });

    
class Home extends Component {
    constructor()
    {
        super();
   
        
        this.state={
            date : '',
            apidata : [{}],
            favColor:0,
            comment:"",
            commentFlag:0
        }
    }
    
    componentWillMount() {
      let that = this;
      let data=null;
      let apiData;
      let xhr = new XMLHttpRequest();
  
        xhr.open("GET","https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
    //    xhr.setRequestHeader('Cache-Control',"no-cache");
        xhr.send(data);
        xhr.onreadystatechange = function(){
          if(this.readyState===4){
            console.log(this.responseText);
            
           apiData=JSON.parse(this.responseText);
             console.log(apiData);
             
            apiData=apiData.data;
            that.setState({apidata:apiData});
          }
      }

    
   
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
          //Setting the value of the date time
          date:
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });	
      }
      fillColorHandler=()=>{
          this.setState({favColor:1})
      }
      outlineColorHandler=()=>{
        this.setState({favColor:0})
    }

    commentHandler=(e,value)=>{
      this.setState({comment:e.target.value})
      console.log(this.state.comment);
      
    }
    putComment=()=>{
      this.setState({commentFlag:1})
    }
    
    render(){
        const { classes } = this.props;
        console.log(this.state.apidata);
        
      
        
        let now =  new Date();

        return(
                <div>
                    <Card className={classes.card}>
                      <CardHeader
                             avatar={
                                     <Avatar  alt="upgrad" src={this.state.apidata.profile_picture} className={classes.bigAvatar}>
                                                  
                                     </Avatar>
                                    }
                                 title={this.state.apidata.username}
                                 subheader={this.state.date}
                       />
                     <CardMedia
                          className={classes.media}
                          image={this.state.apidata.profile_picture}
                          title="Pg certifiction in digital marketing"
                     />
                    <CardContent>
                        <Typography component="p">
                        Pg Diploma from upgrad  <br></br>
                        #going to uttrakhand  
                        </Typography>
                        
                    </CardContent>
                    <CardActions>
        { this.state.favColor===0 && 
        <IconButton onClick={this.fillColorHandler} aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        }
         { this.state.favColor===1 && 
        <IconButton onClick={this.outlineColorHandler} aria-label="Add to favorites" style={{color:"#b20505"}}>
          <Favorite />
        </IconButton>
        }
        <Typography className={classes.test}>
        7 likes
        </Typography>
      </CardActions>
      {this.state.commentFlag==1 &&
      <Typography className={classes.test}>
        {this.state.comment}
        </Typography>
      }
      <form className="subscriber-form" onSubmit={this.putComment}>
      <TextField
        label="Add a comment"
        className={classes.textField}
        margin="normal"
        onChange={this.commentHandler}
      />
       <Button  variant="contained" color="primary" className={classes.button}>
        ADD
      </Button>
      </form>
          </Card>
                   
    </div>
        )
    }

}
export default withStyles(styles)(Home);