import React from 'react';
import PropTypes from 'prop-types';

import Section from './Section';

class Accordion extends React.Component {
  static Section = Section;

  constructor(props) {
    super(props);

    const { initOpenSections } = props;

    this.state = {
      openSections: initOpenSections,
    };
  }

  toggleSection = index => {
    const { openSections } = this.state;

    const foundIndex = openSections.findIndex(i => i === index);
    if (foundIndex === -1) openSections.push(index);
    else openSections.splice(foundIndex, 1);

    this.setState({ openSections });
  };

  openAllSections = () => {
    const { children } = this.props;
    const allSections = children.map((_, index) => index);
    this.setState({ openSections: allSections });
  };

  closeAllSections = () => {
    this.setState({ openSections: [] });
  };

  render() {
    const { openSections } = this.state;
    const { children, title } = this.props;

    // inject props for each Accordion.Section for use in opening/closing Sections
    const childrenWithProps = React.Children.map(children, (child, index) => {
      if (!child) return null;

      const isOpen = openSections.includes(index);
      return React.cloneElement(child, {
        index,
        openSections,
        isOpen,
        toggleSection: this.toggleSection,
      });
    });

    return (
      <div style={{ width: '100%' }}>
        {title && <h3>{title}</h3>}
        {childrenWithProps}
      </div>
    );
  }
}

Accordion.defaultProps = {
  initOpenSections: [],
  title: '',
};

Accordion.propTypes = {
  initOpenSections: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  title: PropTypes.string,
};

export default Accordion;
