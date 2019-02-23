import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import Apidata from './Apidata'
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import JobsList from './JobsList'

export default class Example extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
        query: "",
        searchType: "title",
        sortBy: "",
        events: null
      };

      this.setQuery = this.setQuery.bind(this);
      this.searchJob = this.searchJob.bind(this);
      this.setSearchType = this.setSearchType.bind(this);
      this.setSortType   = this.setSortType.bind(this);
    }

    setQuery(e) {
      this.setState({ 
        query: e.target.value 
      });
    }
    
    setSearchType(e){
      this.setState({ 
        searchType: e.target.value 
      });
    }

    setSortType(e){
      console.log(e.target.value);
      this.setState({ 
        sortBy: e.target.value 
      });
    }

    searchJob(e) {
      var query = this.state.query;
      var searchType = this.state.searchType;
      var sortType = this.state.sortBy;

      axios
      .get('/jobs/'+searchType+'?query='+query+'&sort_by='+sortType)
      .then(response => this.setState({ events: response.data }))
      .catch((err) => {
        error('Something went wrong');
        console.warn(err);
      });

      e.preventDefault();
    }

    render() {
      const {events,searchType,query} = this.state;
      if (events === null){
        return (
            <div className='content'>
                <div className="text-center">
                  <Link to="/jobs" className="btn btn-primary" >Show all jobs</Link>
                </div>

                <div className="text-center mt-2">       
                  <form onSubmit={this.searchJob}>
                    <label htmlFor="searchValue" className="mr-2">Search: </label>
                    <select name="searchValue" onChange={this.setSearchType}>
                      <option value="title">Job Title</option>
                      <option value="companyname">Company Name</option>
                      <option value="location">Location</option>
                      <option value="source">Source</option>
                      <option value="salary">Salary</option>
                      <option value="type">Type</option>
                      <option value="experience">Experience</option>
                      <option value="startdate">Start Date</option>
                      <option value="enddate">End Date</option>
                    </select>


                    <input onChange={this.setQuery} placeholder="Enter a value to search"></input>

                    <label htmlFor="sortValue" className="ml-2 mr-2"> sort by: </label>

                    <select name="sortValue" onChange={this.setSortType} >
                      <option value=""></option>
                      <option value="location">Location</option>
                      <option value="type">Type</option>
                    </select>

                    <button type="submit">go</button>
                  </form>

                  <Route path="/jobs" component={Apidata} />
                </div>
            </div>
        );
      }
      else
      {
        return (
          <div className="ml-2">
            <p>Search result for {searchType} with query {query}</p>
            <JobsList events={events}/>
          </div>
        );
      }
    }
}