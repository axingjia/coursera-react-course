import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Dishdetail extends Component {

  constructor(props) {
      super(props);



  }

  renderComments(comments){
    if (comments != null){
        const commentDOM=comments.map((comment)=>{
            return (
              <ul key={comment.id} className="list-unstyled">
              <li> -- {comment.author},{comment.date}}</li>
              <li> -- {comment.comment}</li>
              </ul>


            );
        });
        return(
            <div>
            <h4>Comments</h4>
            {commentDOM}
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
        
      }else{
          return (
            <div className="container">
            <div className="row">
                <Card className="col-12 col-md-5 m-1">
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
              <div className="col-12 col-md-5 m-1">
                {this.renderComments(dish.comments)}
              </div>
            </div>
            </div>
            
        );
    }

  }

}

export default Dishdetail;
