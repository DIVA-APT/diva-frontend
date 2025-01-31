import { Link, Outlet } from 'react-router';
import logo1 from './assets/logo-1.webp';

const App = () => {
  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#6A9AB0',
          padding: '5px 10px',
        }}
      >
        <img src={logo1} width={50} height={50} alt='logo'></img>
        <h1
          className='col-sm-6'
          style={{ color: '#001F3F', marginLeft: '10px' }}
        >
          <Link to={'/'} style={{ textDecoration: 'none', color: '#001F3F' }}>
            DivA
          </Link>
        </h1>
      </header>
      <Outlet />
    </>
  );
};

export default App;
