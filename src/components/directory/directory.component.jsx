import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.style.scss';

import { connect } from 'react-redux'
import { selectDirectorySections } from '../../redux/directory/directory.selector';
import { createStructuredSelector } from 'reselect';

// Class component. Need to access state
const Directory = ({ sections }) => (      
  <div className="directory-menu">
      { sections.map(({ title, imageUrl, id, size, linkUrl }) => (
          <MenuItem key={ id } title={ title } imageUrl={ imageUrl } size={ size } linkUrl={ linkUrl }/>
      ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory)
