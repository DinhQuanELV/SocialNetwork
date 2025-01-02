import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './SidebarOnly.module.scss';
import Sidebar from '~/Layouts/components/Sidebar';
import SidebarSmall from '~/Layouts/components/Sidebar/SidebarSmall';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  return (
    <Container fluid className={cx('wrapper')}>
      <Row>
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={0}
          xl={0}
          xxl={0}
          className="d-none d-sm-none d-md-none d-lg-none d-xl-flex d-xxl-flex"
        >
          <Sidebar />
        </Col>
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={0}
          xl={0}
          xxl={0}
          className="d-none d-sm-none d-md-flex d-lg-flex d-xl-none d-xxl-none"
        >
          <SidebarSmall />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="pe-0">
          <div className={cx('content')}>{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default DefaultLayout;
