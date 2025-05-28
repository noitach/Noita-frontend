// Dependencies
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchCarouselPictures } from '../../../../../actions/carousel/carouselActions';

// Types
import { RootState } from '../../../../../reducers/indexReducer';
import { AppDispatch } from '../../../../../store';
import ImageGallery from 'react-image-gallery';

// Styles
import 'react-image-gallery/styles/css/image-gallery.css';
import './Carousel.scss';

const Carousel = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const galleryRef = useRef<ImageGallery | null>(null);

  // Redux state
  const pictures = useSelector(
    (state: RootState) => state.carousel.pictureList,
  );

  // Local state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fetch carousel pictures
  useEffect(() => {
    dispatch(fetchCarouselPictures());
  }, [dispatch]);

  const images = pictures.map((picture) => {
    return {
      original: `${picture.url}`,
    };
  });

  // Toggle fullscreen mode and autoplay when clicking on the gallery
  const handleGalleryClick = () => {
    if (galleryRef.current) {
      galleryRef.current.toggleFullScreen();
      setIsFullscreen(!isFullscreen);
      const newIsFullscreen = !isFullscreen;
      newIsFullscreen ? galleryRef.current.pause() : galleryRef.current.play();
    }
  };

  return (
    <ImageGallery
      additionalClass="Carousel"
      autoPlay={true}
      disableSwipe={false}
      flickThreshold={0.4}
      items={images}
      lazyLoad={true}
      onClick={handleGalleryClick}
      ref={galleryRef}
      showFullscreenButton={false}
      showIndex={false}
      showPlayButton={false}
      showThumbnails={false}
      slideDuration={500}
      slideInterval={5000}
      swipeThreshold={30}
      useBrowserFullscreen={true}
    />
  );
};

export default Carousel;
