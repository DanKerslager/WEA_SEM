//import './Footer.css';
// React component that renders the footer of the app.
import {Box, useColorModeValue,} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as={'footer'} bg={useColorModeValue('gray.100', 'gray.900')} id='footer'>
      <Box >
        <p>&copy; 2024 BookStock s.r.o.</p>
      </Box>
    </Box>
  );
};
export default Footer;
