


import React, { Component } from 'react';
import axios from 'axios'

class Reviews extends Component {
    state = {
        reviews: []
    }

componentWillMount = async() => {
    try {
        await axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.shop.id}/reviews`, {
            headers: {
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`  
            }
        }).then((res) => {
            this.setState({reviews: res.data.reviews})
        }) 
    } catch(err) {
        console.log(err)
    }

}

    render() {
        console.log(this.state.reviews)
        const data = this.state.reviews.map((rev) => {
            return (
                <div>
                    
                <p>"{rev.text}"  - {rev.user.name} </p>

                </div>
            )
        })
        return (
            <div>
                    {data}
            </div>
        );
    }
}

export default Reviews;