import React from 'react';
import PropTypes from 'prop-types';

class JobsList extends React.Component {

  renderEvents() {
    const { events } = this.props;
    console.log(events['jobsfeed']);
    return events['jobsfeed'].map(event => (
      <li key={event._id}>
          {event.title}
          {' - '}
          {event.applylink}
      </li>
    ));
  }

  render() {
    return (
      <div>
      	<ul>{this.renderEvents()}</ul>
      </div>
    );
  }
}

JobsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.arrays)
};

JobsList.defaultProps = {
  events: [],
};

export default JobsList;