import React from 'react';
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// Redux
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

// Route
import { Route } from 'react-router-dom';

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverviewContainer}></Route>

        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}></Route>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
