import { Outlet } from 'react-router';

const App = () => {
  return (
    <>
      <h1 className='col-sm-6'>헤더 입니다. 로고 이미지가 포함된.</h1>
      <Outlet />
    </>
  );
};

export default App;
