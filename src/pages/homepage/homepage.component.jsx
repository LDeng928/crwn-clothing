import React from 'react';
// import './homepage.style.scss';

import Directory from '../../components/directory/directory.component';
import { HomePageContainer } from './homepage.styles';

// functional component
const HomePage = () => (
    <HomePageContainer>
       <Directory />
    </HomePageContainer>
)

export default HomePage;