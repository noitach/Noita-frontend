// Dependencies
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Redux actions
import { fetchCarouselPictures } from '../../../actions/carousel/carouselActions';

// Types
import { RootState } from '../../../reducers/indexReducer';

// Subcomponents
import BoHeader from '../../organisms/BoHeader/BoHeader';
import BoCarouselCard from './BoCarouselCard/BoCarouselCard';
import BoCarouselEmptyCard from './BoCarouselEmptyCard/BoCarouselEmptyCard';
import FailureMessages from '../../organisms/FailureMessages/FailureMessages';

// Styles
import './BoCarousel.scss';
import { AppDispatch } from '../../../store';

const BoCarousel = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  const pictures = useSelector(
    (state: RootState) => state.carousel.pictureList,
  );
  const failureMessages = useSelector(
    (state: RootState) => state.carousel.failureMessages,
  );

  // Ensure pictures is an array
  const picturesArray = Array.isArray(pictures) ? pictures : [];
  const pictureNumber = picturesArray.length;

  // Fetch carousel pictures
  useEffect(() => {
    dispatch(fetchCarouselPictures());
  }, [dispatch]);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <BoHeader />
      <main className="BoCarousel">
        {failureMessages.length > 0 && (
          <FailureMessages failureMessages={failureMessages} />
        )}
        <div className="BoCarousel-cards">
          {picturesArray.map((picture) => {
            let position;
            if (picture.position === 1) {
              position = 'first';
            } else if (picture.position === pictureNumber) {
              position = 'last';
            } else {
              position = 'middle';
            }
            return (
              <BoCarouselCard
                key={picture.id}
                id={picture.id}
                url={`${picture.url}`}
                position={position}
              />
            );
          })}
          <BoCarouselEmptyCard />
        </div>
      </main>
    </>
  );
};

export default BoCarousel;
