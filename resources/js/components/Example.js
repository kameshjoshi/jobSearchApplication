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
        // bgColor: "white",
        searchType: "title",
        events: null,
      };

      this.setQuery = this.setQuery.bind(this);
      this.searchJob = this.searchJob.bind(this);
      this.setSearchType = this.setSearchType.bind(this);
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

    searchJob(e) {
      var query = this.state.query;
      var searchType = this.state.searchType;
      // this.setState({
      //   bgColor: this.state.color
      // });

      axios
      .get('/jobs/'+searchType+'?query='+query)
      .then(response => this.setState({ events: response.data }))
      .catch((err) => {
        error('Something went wrong');
        console.warn(err);
      });

      e.preventDefault();
    }

    render() {
      // var squareStyle = {
      //     backgroundColor: this.state.bgColor
      //   };

      const { events } = this.state;
      if (events === null){
        return (
            <div className='content'>
                <div className="text-center">
                  <Link to="/jobs" className="btn btn-primary" >Show all jobs</Link>
                </div>

                <div className="">
                  <div></div>
       
                  <form onSubmit={this.searchJob}>

                    <select name="searchValue" onChange={this.setSearchType} >
                      <option value="title">Job Title</option>
                      <option value="companyname">Company Name</option>
                      <option value="location">Location</option>
                      <option value="skills">Skills</option>
                    </select>

                    <input onChange={this.setQuery} placeholder="Enter a value to search"></input>
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
          <div className="">
            <JobsList events={events}/>
          </div>
        );
      }
    }
}

function Input ({ callback, type = 'text', disabled = false, readOnly = false, placeholder = '',id = '' }) {
  return (
    <input
      id={id}
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
}

function searchTitle(val){
  console.log(val);
}

