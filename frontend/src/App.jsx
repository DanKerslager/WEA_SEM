import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';

/**
 *  Start of a Book Catalog application, that is divided into three components: Header, Main, Footer
 * @returns rendered web application  
 */
function App() {
  return (
    <div>
      <Header />
      <Main />  {/* No props passed since all filtering and pagination is now handled inside Main */}
      <Footer />
    </div>
  );
}

export default App;
