// Dependencies
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux actions
import { fetchCarouselPictures } from '../../../actions/carousel/carouselActions';

// Types
import { RootState } from '../../../reducers/indexReducer';

// Subcomponents
import BoHeader from '../../organisms/BoHeader/BoHeader';
import LoginForm from '../../organisms/LoginForm/LoginForm';
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

  const pictureNumber = pictures.length;

  // Fetch carousel pictures
  useEffect(() => {
    dispatch(fetchCarouselPictures());
  }, [dispatch]);

  return (
    <>
      <BoHeader />
      <main className="BoCarousel">
        {failureMessages.length > 0 && (
          <FailureMessages failureMessages={failureMessages} />
        )}
        <div className="BoCarousel-cards">
          {pictures?.map((picture) => {
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
      {!isLogged && <LoginForm />}
    </>
  );
};

export default BoCarousel;
