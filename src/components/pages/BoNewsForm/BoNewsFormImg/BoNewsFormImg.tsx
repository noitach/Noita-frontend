// Dependencies
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Redux actions
import { changeNewsInput } from '../../../../actions/news/newsActions';

// Utils
import { handleImageChange } from '../../../../utils/imgUtils';

// Types
import { RootState } from '../../../../reducers/indexReducer';

// React-icons
import { LuImagePlus } from 'react-icons/lu';

// Images
import placeholder from '../../../../assets/images/news-placeholder.svg';

// Styles
import './BoNewsFormImg.scss';

const BoNewsFormImg = () => {
  // Hooks
  const location = useLocation();

  // Redux state
  const formInputs = useSelector((state: RootState) => state.news.form);
  const imgUrl = useSelector(
    (state: RootState) => state.news.newsDetails?.image_url,
  );

  // Image to display
  const isEdit = location.pathname.includes('edit');
  let imgToDisplay;
  if (isEdit && formInputs.img64 === '') {
    imgToDisplay = `${imgUrl}`;
  } else {
    imgToDisplay = formInputs.img64 ? formInputs.img64 : placeholder;
  }

  return (
    <div className="BoNewsFormImg">
      <label htmlFor="image64" className="BoNewsFormImg-label">
        <p className="BoNewsFormImg-label-p">Upload a picture</p>
        <LuImagePlus className="BoNewsFormImg-label-icon" />
      </label>
      <input
        type="file"
        id="image64"
        className="BoNewsFormImg-input"
        accept="image/*"
        onChange={(e) => handleImageChange(e, changeNewsInput)}
      />
      <div className="BoNewsFormImg-imgContainer">
        <img
          src={imgToDisplay}
          alt="news"
          className="BoNewsFormImg-imgContainer-img"
        />
      </div>
    </div>
  );
};

export default BoNewsFormImg;
