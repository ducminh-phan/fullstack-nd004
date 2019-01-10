import React from 'react';
import { connect } from 'react-redux';
import { Alert, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';


function typeToStyle(type) {
  switch (type) {
    case 'success':
      return 'success';
    case 'error':
      return 'danger';
    default:
      return 'info';
  }
}


const Flash = props => (
  <div className="row">
    <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <Collapse in={!!props.message}>
        <Alert bsStyle={typeToStyle(props.type)}>
          {props.message}
        </Alert>
      </Collapse>
    </div>
  </div>
);


Flash.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};


const mapStateToProps = ({ alert }) => ({ type: alert.type, message: alert.message });


export default connect(
  mapStateToProps,
)(Flash);
