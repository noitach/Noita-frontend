// Dependencies
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Subcomponents
import BoHeader from '../../organisms/BoHeader/BoHeader';
import BoHomeBtn from './BoHomeBtn/BoHomeBtn';

// Types
import { RootState } from '../../../reducers/indexReducer';

// Icons
import { RiCarouselView } from 'react-icons/ri';
import { BsPostcard } from 'react-icons/bs';
import { IoCalendarOutline } from 'react-icons/io5';

// Styles
import './BoHome.scss';

const BoHome = () => {
  const isLogged = useSelector((state: RootState) => state.login.isLogged);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <BoHeader />
      <main className="BoHome">
        <BoHomeBtn
          title="Carousel"
          icon={<RiCarouselView />}
          link="/admin/carousel"
        />
        <BoHomeBtn
          title="Concerts"
          icon={<IoCalendarOutline />}
          link="/admin/concerts"
        />
        <BoHomeBtn title="News" icon={<BsPostcard />} link="/admin/news" />
      </main>
    </>
  );
};

export default BoHome;
