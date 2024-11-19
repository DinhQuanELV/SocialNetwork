import Sidebar from '../components/Sidebar';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
