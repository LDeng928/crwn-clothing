import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

// Redux
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions';

// Route
import { Route } from 'react-router-dom'

// Import firestore util
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

// Using the Higher Order Component (HOC) WithSpinner
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);

const CollectionPageWithSpinner = WithSpinner(CollectionPage);


// From 
class ShopPage extends React.Component  {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;

    const collectionRef = firestore.collection('collections'); // fetch the data from firestore with the collection name as 'collections'

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot( async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });

    
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>

      <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}></CollectionOverviewWithSpinner>}></Route>

      <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}></CollectionPageWithSpinner>}></Route>
    </div>
    )
  }
   
  };

const mapStateToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapStateToProps)(ShopPage);