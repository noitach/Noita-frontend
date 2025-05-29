// Dependencies
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';

// Types
import { RootState } from '../../reducers/indexReducer';

// Components
// Lazy load components
const Home = lazy(() => import('../pages/Home/Home'));
const News = lazy(() => import('../pages/News/News'));
const BoHome = lazy(() => import('../pages/BoHome/BoHome'));
const BoConcerts = lazy(() => import('../pages/BoConcerts/BoConcerts'));
const BoConcertsForm = lazy(() => import('../pages/BoConcertsForm/BoConcertsForm'));
const BoNews = lazy(() => import('../pages/BoNews/BoNews'));
const BoNewsForm = lazy(() => import('../pages/BoNewsForm/BoNewsForm'));
const BoCarousel = lazy(() => import('../pages/BoCarousel/BoCarousel'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));

// Styles
import './App.scss';

function App() {
  const language: 'de' | 'fr' = useSelector(
    (state: RootState) => state.global.language,
  );

  const metaInfo = {
    fr: {
      title: 'Noïta',
      description:
        'Noïta est un groupe de femmes choristes à Zurich. Découvrez nos concerts et nos actualités.',
      ogTitle: 'Noïta',
      ogDescription:
        'Noïta est un groupe de femmes choristes à Zurich. Découvrez nos concerts et nos actualités.',
    },
    de: {
      title: 'Noïta',
      description:
        'Noïta ist ein Frauenchor in Zürich. Entdecken Sie unsere Konzerte und Neuigkeiten.',
      ogTitle: 'Noïta',
      ogDescription:
        'Noïta ist ein Frauenchor in Zürich. Entdecken Sie unsere Konzerte und Neuigkeiten.',
    },
  };

  const { title, description, ogTitle, ogDescription } = metaInfo[language];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
      </Helmet>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/admin" element={<BoHome />} />
            <Route path="/admin/concerts" element={<BoConcerts />} />
            <Route
              path="/admin/concerts/add"
              element={<BoConcertsForm type="add" title="Add concert" />}
            />
            <Route
              path="/admin/concerts/edit/:id"
              element={<BoConcertsForm type="edit" title="Edit concert" />}
            />
            <Route path="/admin/news" element={<BoNews />} />
            <Route
              path="/admin/news/add"
              element={<BoNewsForm type="add" title="Add news" />}
            />
            <Route
              path="/admin/news/edit/:id"
              element={<BoNewsForm type="edit" title="Edit news" />}
            />
            <Route path="/admin/carousel" element={<BoCarousel />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
