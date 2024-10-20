//import './Footer.css';
// React component that renders the footer of the app.
import {Box, useColorModeValue,} from '@chakra-ui/react'
const Footer = () => {
  return (
    <footer id='footer'>
      <Box bg={useColorModeValue('gray.100', 'gray.900')}>
        <p>&copy; 2024 BookStock s.r.o.</p>
      </Box>
      
    </footer>
  );
};

export default Footer;
