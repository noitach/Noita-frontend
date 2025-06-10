// Dependencies
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

// React-icons
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';

// Redux actions
import {
  fetchConcertList,
  displayRemoveBox,
  hideRemoveBox,
} from '../../../actions/concert/concertsActions';

// Types
import { RootState } from '../../../reducers/indexReducer';
import { AppDispatch } from '../../../store';

// Subcomponents
import BoHeader from '../../organisms/BoHeader/BoHeader';
import ConfirmBox from '../../organisms/ConfirmBox/ConfirmBox';

// Styles
import './BoConcerts.scss';

const BoConcerts = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  const concerts = useSelector(
    (state: RootState) => state.concerts.concertList,
  );
  const { isRemoveBoxDisplayed, removeBoxId } = useSelector(
    (state: RootState) => state.concerts,
  );

  // Ensure concerts is an array
  const concertsArray = Array.isArray(concerts) ? concerts : [];

  // Fetch concert list
  useEffect(() => {
    dispatch(fetchConcertList());
  }, [dispatch]);

  // Close confirm box when clicking elsewhere
  useEffect(() => {
    const handleClick = () => {
      if (isRemoveBoxDisplayed) {
        dispatch(hideRemoveBox());
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isRemoveBoxDisplayed, dispatch]);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <BoHeader />
      <main className="BoConcerts">
        <Link className="BoConcerts-add" to="/admin/concerts/add">
          <p className="BoConcerts-add-p"> Add concert</p>
          <FiPlusCircle className="BoConcerts-add-icon" />
        </Link>
        <table className="BoConcerts-table">
          <thead className="BoConcerts-table-head">
            <tr className="BoConcerts-table-head-row">
              <th className="BoConcerts-table-head-row-cell">ID</th>
              <th className="BoConcerts-table-head-row-cell">City</th>
              <th className="BoConcerts-table-head-row-cell">Event date</th>
              <th className="BoConcerts-table-head-row-cell">Venue</th>
              <th className="BoConcerts-table-head-row-cell">Event name</th>
              <th className="BoConcerts-table-head-row-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="BoConcerts-table-body">
            {concertsArray.map((concert) => (
              <tr key={concert.id} className="BoConcerts-table-body-row">
                <td className="BoConcerts-table-body-row-cell">{concert.id}</td>
                <td className="BoConcerts-table-body-row-cell">
                  {concert.city}
                </td>
                <td className="BoConcerts-table-body-row-cell">
                  {concert.event_date}
                </td>
                <td className="BoConcerts-table-body-row-cell">
                  {concert.venue}
                </td>
                <td className="BoConcerts-table-body-row-cell">
                  {concert.event_name}
                </td>
                <td className="BoConcerts-table-body-row-cell actions">
                  <Link
                    className="BoConcerts-table-body-row-cell actions-btn edit"
                    to={`/admin/concerts/edit/${concert.id}`}
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="BoConcerts-table-body-row-cell actions-btn remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(displayRemoveBox(concert.id));
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                  {isRemoveBoxDisplayed && removeBoxId === concert.id && (
                    <ConfirmBox id={concert.id} type="concert" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default BoConcerts;
