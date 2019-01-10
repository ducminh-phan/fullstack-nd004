import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import formWrapper from '../../utils/wrappers/formWrapper';


class Item extends Component {
  componentDidMount() {
    const { categoryId, itemId } = this.props.match.params;
    this.props.getItem(categoryId, itemId);
  }

  render() {
    if (!this.props.item) {
      return null;
    }

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            {this.props.item.name}
          </Panel.Title>
        </Panel.Heading>

        <Panel.Body>
          {this.props.item.description}
        </Panel.Body>

        <Panel.Footer>
          Category:
          {' '}
          {this.props.item.category.name}
        </Panel.Footer>
      </Panel>);
  }
}


Item.propTypes = {
  getItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  match: ReactRouterPropTypes.match.isRequired,
};


Item.defaultProps = {
  item: null,
};


export default formWrapper(Item);
