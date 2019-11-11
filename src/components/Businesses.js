import React, { Component } from 'react';
import Reviews from './Reviews'

class Businesses extends Component {
    render() {
        const data = this.props.resultShops.map((shop) => {

            return(
                <div>
                    
                    <div>
                        <img src={shop.image_url} alt={shop.name} height= '300px' width='300' style={{boxShadow: '7px 7px 5px black'}}/>
                    </div>

                    <div style={{
                        paddingLeft: '20px'
                    }}> 
                        <p>Name: {shop.name}</p>
                        <p>Phone: {shop.display_phone}</p>
                        <p>Address: {shop.location.address1}</p>
                        <p> {shop.location.address2}</p>
                        <p> {shop.location.address3}</p>
                        <p>City: {shop.location.city}</p>
                        <p>Rating: {shop.rating}</p>
                    </div>

                    <div>
                        <h4>REVIEWS</h4>
                        <Reviews shop={shop}/>
                    </div>

                </div>
            )
        })        
        return (
            <div style={
                {
                    display: 'flex'
                }
            }>
                {data}
            </div>
        );
    }
}

export default Businesses;