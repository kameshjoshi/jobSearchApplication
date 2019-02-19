import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import Apidata from './Apidata'
import { render } from 'react-dom';
import { Link } from 'react-router-dom';


export default class Example extends Component {
    render() {
        return (
            <div className='content'>
                <Link to="/jobs">Jobs</Link>
                <Input type='text' placeholder='Insert some text here...' id= 'title' callback={(val) => showApiData(val,this)}/>
                <Route path="/jobs" component={Apidata} />
            </div>

        );
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

function showApiData(val,elem){
    console.log(elem.id);
    console.log(val);
}

