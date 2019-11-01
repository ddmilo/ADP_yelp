import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl'
import axios from 'axios';
import Businesses from './Businesses';



class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            resultShops: []
        }
    }

    handleSearch = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    handleSearchSubmit = (e) => {
        e.preventDefault()

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, {
            dataType : 'jsonp',
            headers: {
                accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`  
            },
            params:{
                location: 'Alpharetta',
                categories: this.state.searchInput,
                sort_by: 'rating',
                limit: 5
            }
        }).then((res) => {
            console.log(res)
            this.setState({resultShops: res.data.businesses})
        })
        console.log('searchInput state: ' + this.state.searchInput)
    }
    

    render() {
        console.log(this.state.resultShops)

        return (
            <div>
                <div>
                    <form onSubmit={this.handleSearchSubmit}>
                        <FormControl >
                            <InputBase 
                                name='searchInput'
                                placeholder='Search...'
                                onChange={this.handleSearch}                            
                            />
                        </FormControl>
                    </form>
                </div>


                <div>
                    <Businesses resultShops={this.state.resultShops}/>
                </div>
            </div>
        );
    }
}

LandingPage.propTypes = {

};

export default LandingPage;