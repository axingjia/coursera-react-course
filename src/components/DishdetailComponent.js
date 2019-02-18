import React, { Component } from 'react';
// import { Card, CardImg, CardImgOverlay, CardText, CardBody,
//     CardTitle } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                     <Card className="col-12 col-md-5 m-1">
                          <CardImg top src={dish.image} alt={dish.name} />
                          <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                          </CardBody>
                      </Card>
                     </div>
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
