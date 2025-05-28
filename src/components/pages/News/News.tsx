// Dependencies
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux actions
import { fetchNewsList } from '../../../actions/news/newsActions';

// Utils
import { scrollUpInstantly } from '../../../utils/scrollUtils';

// Types
import { RootState } from '../../../reducers/indexReducer';
import { AppDispatch } from '../../../store';

// Subcomponents
import Header from '../../organisms/Header/Header';
import Post from './Post/Post';
import Footer from '../../organisms/Footer/Footer';

// Styles
import './News.scss';

const News = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const language = useSelector((state: RootState) => state.global.language);
  const news = useSelector((state: RootState) => state.news.newsList);

  useEffect(() => {
    scrollUpInstantly();
  }, []);

  // Fetch News list
  useEffect(() => {
    dispatch(fetchNewsList());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="News">
        <h2 className="News-title">
          {language === 'fr' ? 'Actualités' : 'News'}
        </h2>

        {news.map((post) => {
          // Adapt date format for French and German
          const dateObj = new Date(post.createdAt);
          const dayDe = dateObj.getDate();
          const dayFr = String(dayDe).padStart(2, '0');
          const monthDe = dateObj.getMonth() + 1;
          const monthFr = String(monthDe).padStart(2, '0');
          const year = dateObj.getFullYear();
          const dateDe = `${dayDe}.${monthDe}.${year}`;
          const dateFr = `${dayFr}.${monthFr}.${year}`;

          return (
            <Post
              key={post.id}
              title={language === 'fr' ? post.title_fr : post.title_de}
              date={language === 'fr' ? dateFr : dateDe}
              content={language === 'fr' ? post.content_fr : post.content_de}
              urlImage={`/api/${post.image_url}`}
            />
          );
        })}
      </main>
      <Footer />
    </>
  );
};

export default News;
