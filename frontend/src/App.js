
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import {Wrapper} from './Wrapper';
import {PageProvider} from './providers/PageProvider'
/**
 *  Start of a Book Catalog application, that is divided into three components: Header, Main, Footer
 * @returns rendered web application
 */
function App() {
  return (
    <div>
      <ChakraProvider>
        <PageProvider>
          <Wrapper/>
        </PageProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
