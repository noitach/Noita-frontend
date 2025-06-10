// Dependencies
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Types
import { RootState } from '../../../../../reducers/indexReducer';

// Styles
import './ConcertDate.scss';

const ConcertDate: (props: {
  date: string;
  place: string;
  city: string;
  event: string;
  link: string;
}) => JSX.Element = ({ date, place, city, event, link }) => {
  // Redux state
  const language = useSelector((state: RootState) => state.global.language);

  // Convert AAAA-MM-DD to DD Mounth AAAA
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateFr = dateObj.toLocaleDateString('fr-FR', options);
  const dateDe = dateObj.toLocaleDateString('de-DE', options);

  return (
    <li className="ConcertDate">
      <Link
        className="ConcertDate-link"
        to={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="ConcertDate-link-info">
          <div className="ConcertDate-link-info-date">
            {language === 'fr' ? dateFr : dateDe}
          </div>
          <div className="ConcertDate-link-info-place">{place || 'Venue TBD'}</div>
          <div className="ConcertDate-link-info-event">{event || 'Event TBD'}</div>
        </div>
        <div className="ConcertDate-link-city">{city}</div>
      </Link>
    </li>
  );
};

export default ConcertDate;
