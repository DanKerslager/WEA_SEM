//import './Footer.css';
// React component that renders the footer of the app.
import {Box, useColorModeValue,} from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer id='footer'>
      <Box bg={useColorModeValue('gray.400', 'gray.800')}>
        <p>&copy; 2024 BookStock s.r.o.</p>
      </Box>
    </footer>
  );
};
export default Footer;
