
import './App.css';
import Header from './common/templates/header'
import Footer from './common/templates/footer'

import Routes from './main/routes'
import Message from './common/msg/message'

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes />
      </div>
      <Footer />
      <Message />
    </div>
  );
}

export default App;
