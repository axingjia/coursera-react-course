import React,{ Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    
    if (isLoading) {
        return(
                <Loading />
        );
    }
    else if (errMess) {
        return(
                <h4>{errMess}</h4>
        );
    }
    else{ 
        console.log(baseUrl);
        return(
            
            <Card>
                
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
             
        );
    }

}

class Home extends Component{
    constructor(props){
        super(props);
        console.log('props.dish ',props.dish);
        console.log('props.dish ',props.promotion);
        console.log('props.dish ',props.leader);
    }
    
    
    render(){
        console.log('leaderloading',this.props.leaderLoading);
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={this.props.dish} isLoading={this.props.dishesLoading} errMess={this.props.dishErrMess}  />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={this.props.promotion} isLoading={this.props.promoLoading} errMess={this.props.promoErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={this.props.leader} isLoading={this.props.leaderLoading} errMess={this.props.leaderErrMess} />
                </div>
                
                {/*<div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leaderLoading} errMess={props.leaderErrMess}/>
                </div>*/}
            </div>
        </div>
    );
    }
}

export default Home;