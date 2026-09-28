import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Legal.css';

const LegalPage = ({ title, children }) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | YoRiMiChi`;
    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return (
    <main className="legal-page">
      <article className="legal-document">
        <header className="legal-header">
          <p className="legal-brand">YoRiMiChi</p>
          <h1>{title}</h1>
          <p className="legal-date">制定日・最終改定日：2026年9月28日</p>
        </header>

        <div className="legal-content">{children}</div>

        <div className="legal-back">
          <Link to="/">ホームに戻る</Link>
        </div>
      </article>
    </main>
  );
};

export default LegalPage;
