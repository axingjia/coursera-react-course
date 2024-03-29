import React, { Component } from 'react';
// import { Card, CardImg, CardImgOverlay, CardText, CardBody,
//     CardTitle } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem ,Button,Modal, ModalHeader, ModalBody,Row, Col, Label} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
    
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isCommentModalOpen:false
        };
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
    }
    
    toggleCommentModal() {
        console.log(this.state.isCommentModalOpen);
      this.setState({
        isCommentModalOpen: !this.state.isCommentModalOpen
      });
    }
    
    handleSubmit(values) {
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // this.props.resetFeedbackForm();
        // event.preventDefault();
    }
    render(){
        const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  const minLength = (len) => (val) => val && (val.length >= len);
  const isNumber = (val) => !isNaN(Number(val));
  const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
        return(
        <div>
            <Button outline onClick={this.toggleCommentModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comments</Button>
            <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                <ModalHeader toggle={this.toggleCommentModal}>Login</ModalHeader>
                <ModalBody>
                    <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            
                            <Col md={{size: 12}}>
                               <Label htmlFor="rating" md={12}>Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                 />
                            </Col>
                        </Row>
                        
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="12"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset: 2}}>
                                <Button type="submit" color="primary">
                                Send Feedback
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

class Dishdetail extends Component {

  constructor(props) {
      super(props);
      



  }
  
  
  
  

  renderComments(comments,postComment, dishId){
    if (comments != null){
        const commentDOM=comments.map((comment)=>{
            return (
                
                <Fade in>
            <div key={comment.id}>
              <ul key={comment.id} className="list-unstyled">
              <li> -- {comment.author},{comment.date}}</li>
              <li> -- {comment.comment}</li>
              </ul>
              
            </div>
            </Fade>

            );
        });
        return(
            <div>
            <h4>Comments</h4>
            {commentDOM}
            <CommentForm postComment={postComment} dishId={dishId}></CommentForm>
            </div>
        );
    }else
        return(
            <div></div>
        );
  }



  render(){
      
      var dish=this.props.dish;
      if ((this.props.dish === null) || (this.props.dish === undefined)){
          return (<div></div>);
        
      }else if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
      }
      else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
      }
      
      else{
          return (
                <div className="container">
                 <div className="row">
                     <Breadcrumb>

                         <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                         <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                     </Breadcrumb>
                     <div className="col-12">
                         <h3>{this.props.dish.name}</h3>
                         <hr />
                     </div>                
                 </div>
                 <div className="row">
                     <div className="col-12 col-md-5 m-1">
                     <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                     <Card>
                          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                          <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                          </CardBody>
                      </Card>
                      </FadeTransform>
                     </div>
                     <div className="col-12 col-md-5 m-1">
                      
                         {this.renderComments(this.props.comments,this.props.postComment,this.props.dish.id)}
                        
                         
                     </div>
                 </div>
                 
                </div>
             );
    }

  }

}

export default Dishdetail;
