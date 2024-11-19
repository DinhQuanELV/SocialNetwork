import Sidebar from '~/Layouts/components/Sidebar';
import Footer from '~/Layouts/components/Footer';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div>
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
