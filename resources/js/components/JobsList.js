import React from 'react';
import PropTypes from 'prop-types';

class JobsList extends React.Component {

  renderEvents() {
    const { events } = this.props;
    console.log(events);
    console.log(events === null);
    if (events === null || events.length == 0){
    	return (
    		<div className="container ml-2">
    			No Jobs Found
    		</div>
    	);
    }

    return events.map(event => (
      	<div key={event._id} className='col-5 mt-2 ml-2 mr-4 mb-2'>
	      	<div className="card">
			  <div className="card-header">
			    {event.title} {' - '} {event.companyname}
			  </div>
			  <div className="card-body">
			    <p> Link: <a href={event.applylink}>{event.applylink}</a> </p>
			    <p>{event.jd}</p>
			    <p>Location: {event.location}</p>
			    <p>Experience: {event.experience}</p>
			    <p>Skills: {event.skills}</p>
			  </div>
			</div>
		</div>
    ));
  }

  render() {
    return (
      <div>
      	<div className='row '>
      		{this.renderEvents()}
      	</div>
      </div>
    );
  }
}

JobsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object)
};

JobsList.defaultProps = {
  events: [],
};

export default JobsList;