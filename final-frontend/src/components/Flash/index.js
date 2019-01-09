import { connect } from 'react-redux';

import Flash from './Flash';


const mapStateToProps = ({ alert }) => ({ type: alert.type, message: alert.message });


export default connect(
  mapStateToProps,
)(Flash);
