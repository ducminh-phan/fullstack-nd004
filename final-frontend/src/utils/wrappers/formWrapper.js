import React from 'react';

function formWrapper(WrappedComponent) {
  return props => (
    <div className="row">
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <WrappedComponent {...props} />
      </div>
    </div>
  );
}

export default formWrapper;
