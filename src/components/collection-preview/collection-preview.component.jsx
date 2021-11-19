import React from 'react';
import CollectionItem from '../collection-item/collection-item.component'

// import './collection-preview.style.scss';

import { CollectionPreviewStyles, TitleContainer, PreviewContainer } from './collection-preview.styles'

const CollectionPreview = ({ title, items }) => (
  <CollectionPreviewStyles>
    <TitleContainer>{title.toUpperCase()}</TitleContainer>
    <PreviewContainer>
      {items
          .filter((item, idx) => idx < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </PreviewContainer>
    </CollectionPreviewStyles>
);

export default CollectionPreview;