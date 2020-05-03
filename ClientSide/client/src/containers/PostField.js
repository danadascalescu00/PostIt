import React, { Component } from 'react'
import MultilineTextField from './TextField'
import TitleTextField from './TitleField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import axios from 'axios'
import './PostField.css'
import loading from './loading2.gif'


const envDomain = 'localhost'

class PostField extends Component {
	constructor(props) {
		super(props)
		this.state = {
			content: '',
			error: false,
			isLoading: false
		}
	}

	textViewChanged = (value) => {
		this.setState({content: value})
		this.props.change(value)
	}
	
	textViewChangedTitle = (value) => {
		this.setState({title: value})
		this.props.title(value)
	}

	postContent = async () => {
		const accessString = localStorage.getItem('JWT');
		this.setState({
			isLoading: true,
		})
		if (accessString == null) {
      this.setState({
        error: true,  
      });
    } else {
			try {
				const response = await axios.post(`http://${envDomain}/post/twitter`,  
				{ postContent: this.state.content },
				{	
					headers: { 
						authorization: `JWT ${accessString}`,
						'Content-Type': 'application/json',
					}
				});
				if (response.data.message === 'posted') {
					console.log("ok")
					this.setState({
						isLoading: false,
						error: false,
					});
				}
			} catch (error) {
				console.error(error);
				this.setState({
					error: true,
				});
			}
		}
	}
	
	render() {
		if (this.state.error) {
			return (
				<p>Something went wrong</p>
			)
		}

		return (
			<div className="postTextFieldButton">
				<div className="innerContainerPost">
					<TitleTextField change={this.textViewChangedTitle}/>
					<MultilineTextField change={this.textViewChanged}/>
					<ButtonGroup 
						className="editButtonGroup"
						color="secondary" 
						style={{borderRadius: '15px'}} 
						aria-label="outlined secondary button group"
					>
						<Button><b>B</b></Button>
						<Button><i>I</i></Button>
						<Button><u>u</u></Button>
					</ButtonGroup>
					{
						this.state.isLoading
						? <img src={loading} className="postButton" height='45px' width='45px' alt="Check" />
						: <Button
								className="postButton"
								variant="contained"
								color="primary"
								onClick={this.postContent}>
								Post
							</Button>
					}
				</div>
			</div>
		)
	}
}

export default PostField;