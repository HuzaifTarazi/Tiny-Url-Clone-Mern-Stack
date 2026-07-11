import { getShortLink } from "../api";

function UrlList({ urls, loading, onDelete }) {
  if (loading) {
    return (
      <section className="card list-card">
        <p className="empty-text">Loading your links...</p>
      </section>
    );
  }

  if (urls.length === 0) {
    return (
      <section className="card list-card">
        <h2>Your links</h2>
        <p className="empty-text">
          No links yet. Shorten your first URL above!
        </p>
      </section>
    );
  }

  return (
    <section className="card list-card">
      <h2>Your links ({urls.length})</h2>

      <ul className="url-list">
        {urls.map((item) => (
          <li key={item._id} className="url-item">
            <div className="url-info">
              <a
                href={getShortLink(item.shortCode)}
                target="_blank"
                rel="noopener noreferrer"
                className="short-link"
              >
                {getShortLink(item.shortCode)}
              </a>
              <span className="original-url" title={item.originalUrl}>
                → {item.originalUrl}
              </span>
            </div>

            <div className="url-meta">
              <span className="clicks">{item.clicks} clicks</span>
              <button
                type="button"
                className="btn-delete"
                onClick={() => onDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default UrlList;
