import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';

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
