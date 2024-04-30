import CartContainer from './CartContainer';
import Navbar from './Navbar';
import { useGlobalContext } from './context';

function App() {
  const { loading } = useGlobalContext();
  return (
    <>
      {/* {loading && (
        <div className={`loadin-hidden ${loading && 'loading'}`}></div>
      )} */}
      <Navbar />
      <CartContainer />
    </>
  );
}

export default App;
