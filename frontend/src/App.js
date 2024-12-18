
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { Wrapper } from './Wrapper';
import { AuthProvider } from './providers/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
/**
 *  Start of a Book Catalog application, that is divided into three components: Header, Main, Footer
 * @returns rendered web application
 */
function App() {
  return (
    <div>
      <ChakraProvider>
        <AuthProvider>
          <BrowserRouter>
            <Wrapper />
          </BrowserRouter>
        </AuthProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
