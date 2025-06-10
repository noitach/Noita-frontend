// Dependencies
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Subcomponents
import BoHeader from '../../organisms/BoHeader/BoHeader';
import LoginForm from '../../organisms/LoginForm/LoginForm';
import FailureMessages from '../../organisms/FailureMessages/FailureMessages';
import BoConcertsFormBtns from './BoConcertsFormBtns/BoConcertsFormBtns';

// Redux actions
import {
  changeConcertInput,
  postAddConcertForm,
  postEditConcertForm,
  concertFailure,
  fetchConcertDetails,
} from '../../../actions/concert/concertsActions';

// Types
import { RootState } from '../../../reducers/indexReducer';
import { AppDispatch } from '../../../store';

// Styles
import './BoConcertsForm.scss';

const BoConcertsForm: (props: {
  type: string;
  title: string;
}) => JSX.Element | undefined = ({ type, title }) => {
  console.log('BoConcertsForm');

  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Reset the form when we navigate to the form
  useEffect(() => {
    dispatch(changeConcertInput('', 'city'));
    dispatch(changeConcertInput('', 'eventDate'));
    dispatch(changeConcertInput('', 'venue'));
    dispatch(changeConcertInput('', 'eventName'));
    dispatch(changeConcertInput('', 'link'));
    dispatch(concertFailure([]));
  }, [dispatch]);

  // Redux state
  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  const formInputs = useSelector((state: RootState) => state.concerts.form);
  const failureMessages = useSelector(
    (state: RootState) => state.concerts.failureMessages,
  );
  const concertDetails = useSelector(
    (state: RootState) => state.concerts.concertDetails,
  );

  // Search url params to fetch news details for editing
  useEffect(() => {
    if (isLogged && type === 'edit') {
      const url = window.location.href;
      const concertId = Number(url.split('/').pop());
      dispatch(fetchConcertDetails(concertId));
    }
  }, [isLogged, type, dispatch]);

  // Form pre-filling with concert details for editing
  useEffect(() => {
    if (type === 'edit' && concertDetails) {
      dispatch(changeConcertInput(concertDetails.city, 'city'));
      dispatch(changeConcertInput(concertDetails.event_date, 'eventDate'));
      dispatch(changeConcertInput(concertDetails.venue, 'venue'));
      dispatch(changeConcertInput(concertDetails.event_name, 'eventName'));
      dispatch(changeConcertInput(concertDetails.event_url, 'link'));
    }
  }, [type, concertDetails, dispatch]);

  // Handle navigation if concertDetails failed to load in edit mode
  useEffect(() => {
    if (type === 'edit' && isLogged) {
      const url = window.location.href;
      const concertId = Number(url.split('/').pop());
      // If we have a valid concertId but concertDetails is still null after a delay,
      // it means the fetch failed or the concert doesn't exist
      if (concertId) {
        const timer = setTimeout(() => {
          if (concertDetails === null) {
            navigate('/admin/concerts');
          }
        }, 2000); // Give 2 seconds for the API call to complete
        return () => clearTimeout(timer);
      }
    }
  }, [type, isLogged, concertDetails, navigate]);

  // Don't render the form if we're in edit mode but don't have concertDetails yet
  if (type === 'edit' && concertDetails === null) {
    return (
      <>
        <BoHeader />
        <main className="BoConcertsForm">
          <p>Loading...</p>
        </main>
        {!isLogged && <LoginForm />}
      </>
    );
  }

  return (
    <>
      <BoHeader />
      <main className="BoConcertsForm">
        {type === 'edit' ? (
          <h2 className="BoConcertsForm-title">{`${title} : id ${concertDetails!.id}`}</h2>
        ) : (
          <h2 className="BoConcertsForm-title">{title}</h2>
        )}
        <form
          className="BoConcertsForm-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (type === 'add') {
              dispatch(postAddConcertForm(navigate));
            } else {
              dispatch(postEditConcertForm(navigate));
            }
          }}
        >
          <label htmlFor="city" className="BoConcertsForm-form-label">
            City
          </label>
          <input
            type="text"
            id="city"
            className="BoConcertsForm-form-input"
            placeholder="ex. Andermatt"
            required
            value={formInputs.city || ''}
            onChange={(e) => {
              dispatch(changeConcertInput(e.target.value, 'city'));
            }}
          />
          <label htmlFor="eventDate" className="BoConcertsForm-form-label">
            Event date
          </label>
          <input
            type="date"
            id="eventDate"
            className="BoConcertsForm-form-input"
            required
            value={formInputs.eventDate || ''}
            onChange={(e) => {
              dispatch(changeConcertInput(e.target.value, 'eventDate'));
            }}
          />
          <label htmlFor="Venue" className="BoConcertsForm-form-label">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            className="BoConcertsForm-form-input"
            placeholder="ex. Papiersaal"
            value={formInputs.venue || ''}
            onChange={(e) => {
              dispatch(changeConcertInput(e.target.value, 'venue'));
            }}
          />
          <label htmlFor="eventName" className="BoConcertsForm-form-label">
            Event name
          </label>
          <input
            type="text"
            id="eventName"
            className="BoConcertsForm-form-input"
            placeholder="ex. Vertanzt Festival"
            value={formInputs.eventName || ''}
            onChange={(e) => {
              dispatch(changeConcertInput(e.target.value, 'eventName'));
            }}
          />
          <label htmlFor="link" className="BoConcertsForm-form-label">
            Link
          </label>
          <input
            type="text"
            id="link"
            className="BoConcertsForm-form-input"
            required
            placeholder="ex. https://www.vertanzt.ch/"
            value={formInputs.link || ''}
            onChange={(e) => {
              dispatch(changeConcertInput(e.target.value, 'link'));
            }}
          />

          <BoConcertsFormBtns />

          {failureMessages.length > 0 && (
            <FailureMessages failureMessages={failureMessages} />
          )}
        </form>
      </main>
      {!isLogged && <LoginForm />}
    </>
  );
};

export default BoConcertsForm;
