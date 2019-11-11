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
            searchInput: e.target.value.toLowerCase()
        })
    }

    handleSearchSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`, {
                dataType : 'jsonp',
                headers: {
                    accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`  
                },
                params:{
                    location: 'Alpharetta',
                    categories: this.state.searchInput.replace(/\s/g, ''),
                    sort_by: 'rating',
                    limit: 5
                }
            }).then((res) => {
                console.log(res)
                this.setState({resultShops: res.data.businesses})
            })
        } catch(err) {
            console.log(err)
        }

    }
    

    render() {
        console.log(this.state.resultShops)

        return (
            <div>
                <div>
                    <h1>Alpharetta's Top 5</h1>
                </div>
                <div style={{
                    paddingBottom: '50px'
                }}>
                    <form onSubmit={this.handleSearchSubmit} >
                        <FormControl >
                            <InputBase 
                                name='searchInput'
                                placeholder='Search...'
                                onChange={this.handleSearch}
                                style={{
                                    backgroundColor: 'white',
                                    width: '800px',
                                    boxShadow: '3px 3px 3px black'
                                }}                           
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