
import React from 'react';
import './Profile.css';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import ImagePosts from './image-posts';
import Header from '../../common/header/Header'

class ProfileInfo extends React.Component{

    constructor(){
        super();
        this.state = {
            openOrCloseModal : false,
            fullNameRequired : 'dispNone',
            username : "",
            profile_pic :"",
            fullName : "",
            posts : 0,
            follows : 0,
            followed_by : 0,
            hdnFullName : ""
        }

        this.profileInfoURL = 'https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784';
    }

    openModalHandler = () => {
        this.setState({
            openOrCloseModal:true,
            fullNameRequired:'dispNone'
        });
    }

    closeModalHandler = () => {
        this.setState({
            openOrCloseModal:false
        });
    }

    inputFullNameChangeHandler = (e) => {
        this.setState({
            hdnFullName:e.target.value
        })
    }

    updateFullNameHandler = () => {
        this.state.hdnFullName === "" ? this.setState({fullNameRequired:'dispBlock'}) : this.setState({fullName:this.state.hdnFullName, hdnFullName:"", openOrCloseModal:false});
    }

    componentWillMount() {
        let _context = this;        
        let xhrProfileInfo = new XMLHttpRequest();
        xhrProfileInfo.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let profInfoData = JSON.parse(this.responseText);
                _context.setState({
                    username:profInfoData.data.username,
                    profile_pic:profInfoData.data.profile_picture,
                    fullName:profInfoData.data.full_name,
                    posts:profInfoData.data.counts.media,
                    follows:profInfoData.data.counts.follows,
                    followed_by:profInfoData.data.counts.followed_by
                });
            }
        });

        xhrProfileInfo.open("GET", this.profileInfoURL);
        xhrProfileInfo.send();
    }
    
    render(){        
        return(
            <div>
            <Header showSearch="false" showProfile="true"/>
            <br />
            <br />
            <div className='prof-main-container'>
                <Modal open={this.state.openOrCloseModal}
                    aria-labelledby="simple-modal-title"
                    onClose={this.closeModalHandler}
                >
                    <div className='modal-size'>
                        <Typography variant="h6" id="modal-title">
                            Edit
                        </Typography>
                        <br />
                        <FormControl required>
                            <InputLabel htmlFor="fullName"><span className="blue">Full Name</span></InputLabel>
                            <Input id="fullName" type="text" onChange={this.inputFullNameChangeHandler} />                            
                            <FormHelperText className={this.state.fullNameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br /><br />
                        <Button variant="contained" color="primary" onClick={this.updateFullNameHandler}>UPDATE</Button>
                    </div>
                </Modal>                
                <div className='prof-items-container'>
                    <div className='prof-pic-container'><img src={this.state.profile_pic} className="prof-pic" alt="profile pic" /></div>
                    <div className='prof-info-data-container'>
                        <div className='user-name'>{this.state.username}</div>
                        <div className='posts-follows-container'>                            
                            <span>Posts: {this.state.posts}</span>
                            <span className='posts-follows-item'>Follows: {this.state.follows}</span>
                            <span>Followed By: {this.state.followed_by}</span>
                        </div>
                        <div className='full-name-container'>
                            <div className='full-name'>{this.state.fullName}</div>
                            <div className='full-name-edit-btn'>                            
                            <Fab color="secondary" aria-label="Edit" className='edit-btn' size='small' onClick={this.openModalHandler}>
                                <Icon>edit_icon</Icon>
                            </Fab>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <div>
                <ImagePosts />
            </div>
            </div>
        )
    }
   
}

export default ProfileInfo