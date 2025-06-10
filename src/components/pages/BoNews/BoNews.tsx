// Dependencies
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// React-icons
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';

// Redux actions
import {
  fetchNewsList,
  displayRemoveBox,
  hideRemoveBox,
} from '../../../actions/news/newsActions';

// Types
import { RootState } from '../../../reducers/indexReducer';
import { AppDispatch } from '../../../store';

// Subcomponents
import BoHeader from '../../organisms/BoHeader/BoHeader';
import LoginForm from '../../organisms/LoginForm/LoginForm';
import ConfirmBox from '../../organisms/ConfirmBox/ConfirmBox';

// Styles
import './BoNews.scss';

const BoNews = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  const news = useSelector((state: RootState) => state.news.newsList);

  const isRemoveBoxDisplayed = useSelector(
    (state: RootState) => state.news.isRemoveBoxDisplayed,
  );
  const removeBoxId = useSelector((state: RootState) => state.news.removeBoxId);

  // Ensure news is an array
  const newsArray = Array.isArray(news) ? news : [];

  // Fetch news list
  useEffect(() => {
    dispatch(fetchNewsList());
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

  return (
    <>
      <BoHeader />
      <main className="BoNews">
        <Link className="BoNews-add" to="/admin/news/add">
          <p className="BoNews-add-p"> Add news</p>
          <FiPlusCircle className="BoNews-add-icon" />
        </Link>
        <table className="BoNews-table">
          <thead className="BoNews-table-head">
            <tr className="BoNews-table-head-row">
              <th className="BoNews-table-head-row-cell">ID</th>
              <th className="BoNews-table-head-row-cell">French title</th>
              <th className="BoNews-table-head-row-cell">Date</th>
              <th className="BoNews-table-head-row-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="BoNews-table-body">
            {newsArray.map((oneNews) => (
              <tr key={oneNews.id} className="BoNews-table-body-row">
                <td className="BoNews-table-body-row-cell">{oneNews.id}</td>
                <td className="BoNews-table-body-row-cell">
                  {oneNews.title_fr}
                </td>
                <td className="BoNews-table-body-row-cell">
                  {oneNews.createdAt ? oneNews.createdAt.slice(0, 10) : 'N/A'}
                </td>
                <td className="BoNews-table-body-row-cell actions">
                  <Link
                    className="BoNews-table-body-row-cell actions-btn edit"
                    to={`/admin/news/edit/${oneNews.id}`}
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="BoNews-table-body-row-cell actions-btn remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(displayRemoveBox(oneNews.id));
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                  {isRemoveBoxDisplayed && removeBoxId === oneNews.id && (
                    <ConfirmBox id={oneNews.id} type="news" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      {!isLogged && <LoginForm />}
    </>
  );
};

export default BoNews;
