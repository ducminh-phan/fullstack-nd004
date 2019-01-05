import React, { Component } from 'react';
import { Alert, Collapse } from 'react-bootstrap';

const initialState = {
  isSuccess: null,
  message: '',
};

function formWrapper(WrappedComponent) {
  class Wrapper extends Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }

    resetState = () => {
      this.setState(initialState);
    };

    updateStatus = (isSuccess, message) => {
      this.setState({
        isSuccess,
        message,
      });

      setTimeout(this.resetState, 3000);
    };

    render() {
      return (
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <Collapse in={this.state.isSuccess !== null}>
              <Alert bsStyle={this.state.isSuccess ? 'success' : 'danger'}>
                {this.state.message}
              </Alert>
            </Collapse>

            <WrappedComponent changeStatus={this.updateStatus} {...this.props} />
          </div>
        </div>
      );
    }
  }

  return Wrapper;
}

export default formWrapper;
