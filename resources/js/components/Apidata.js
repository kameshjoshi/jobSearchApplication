import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import JobsList from './JobsList'

class Apidata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  } 

  componentDidMount() {
    axios
      .get('/jobs')
      .then(response => this.setState({ events: response.data }))
      .catch((err) => {
			  error('Something went wrong');
			  console.warn(err);
			  });
  }

  render() {
  	const { events } = this.state;
  	if (events === null) return null;

    return (
      <div>
      	<JobsList events={events}/>
      </div>
    );
  }
}

Apidata.propTypes = {
  match: PropTypes.shape(),
};

Apidata.defaultProps = {
  match: undefined,
};

export default Apidata;