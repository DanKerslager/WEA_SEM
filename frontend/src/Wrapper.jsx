import React from 'react'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { Grid, GridItem } from '@chakra-ui/react'
export const Wrapper = () => {
    return (
        <div id='wrapper'>
            <Header />
            <Main />  {/* No props passed since all filtering and pagination is now handled inside Main */}
            <Footer />
        </div>
    )
}

