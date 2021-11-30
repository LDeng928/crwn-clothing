import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

// Redux
import { connect } from 'react-redux'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsFetching } from '../../redux/shop/shop.selector';

// Route
import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';

// Using the Higher Order Component (HOC) WithSpinner
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component  {
  componentDidMount() {
   const { fetchCollectionsStartAsync } = this.props;
   fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionsFetching } = this.props;

    return (
      <div className='shop-page'>

      <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionsFetching} {...props}></CollectionOverviewWithSpinner>}></Route>

      <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={isCollectionsFetching} {...props}></CollectionPageWithSpinner>}></Route>
    </div>
    )
  }
   
  };

const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsCollectionsFetching
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);