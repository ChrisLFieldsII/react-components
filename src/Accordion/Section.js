import React from 'react';
import PropTypes from 'prop-types';

import './Accordion.css';
import upArrow from '../../assets/up-arrow.svg';
import downArrow from '../../assets/down-arrow.svg';

const styles = {
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cccccc',
  },
};

class Section extends React.Component {
  _renderHeader = ({ isOpen }) => {
    const { title } = this.props;

    return (
      <div style={styles.header}>
        <h4 style={{ marginLeft: '5px' }}>{title}</h4>
        <span
          style={{ marginRight: '30px', width: '25px' }}
          dangerouslySetInnerHTML={{ __html: isOpen ? downArrow : upArrow }}
        />
      </div>
    );
  };

  render() {
    const {
      index,
      isOpen,
      openSections,
      renderHeader = this._renderHeader,
      renderContent,
      toggleSection,
    } = this.props;

    return (
      <div>
        <div
          className="cfiirc-section-header"
          role="button"
          onKeyPress={event =>
            event.key === 'Enter' && toggleSection && toggleSection(index)
          }
          onClick={() => toggleSection(index)}
          tabIndex={0}
        >
          {renderHeader({ index, isOpen, openSections })}
        </div>
        <div style={{ display: isOpen ? 'block' : 'none' }}>
          {renderContent({ index, isOpen, openSections })}
        </div>
      </div>
    );
  }
}

Section.defaultProps = {
  title: '',
};

Section.propTypes = {
  index: PropTypes.number.isRequired, // INJECTED BY ACCORDION
  openSections: PropTypes.arrayOf(PropTypes.number).isRequired, // INJECTED BY ACCORDION
  isOpen: PropTypes.bool.isRequired, // INJECTED BY ACCORDION
  toggleSection: PropTypes.func.isRequired, // INJECTED BY ACCORDION. toggleSection(index)
  renderHeader: PropTypes.func.isRequired, // renderHeader({ index, isOpen, openSections })
  renderContent: PropTypes.func.isRequired, // renderContent({ index, isOpen, openSections })
  title: PropTypes.string,
};

export default Section;
