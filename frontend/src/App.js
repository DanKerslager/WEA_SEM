
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import {Wrapper} from './Wrapper'
/**
 *  Start of a Book Catalog application, that is divided into three components: Header, Main, Footer
 * @returns rendered web application  
 */
function App() {
  return (
    <div>
      <ChakraProvider>
        <Wrapper/>
      </ChakraProvider>
    </div>
  );
}

export default App;
