import { useState, useEffect } from "react";
import { fetchUrls, shortenUrl, deleteUrl } from "./api";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUrls();
  }, []);

  async function loadUrls() {
    try {
      setLoading(true);
      const data = await fetchUrls();
      setUrls(data);
    } catch {
      setError("Could not load your links. Is the server running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleShorten(originalUrl) {
    setError("");
    try {
      const newUrl = await shortenUrl(originalUrl);

      setUrls((prev) => {
        const exists = prev.find((item) => item._id === newUrl._id);
        if (exists) {
          return prev.map((item) =>
            item._id === newUrl._id ? newUrl : item
          );
        }
        return [newUrl, ...prev];
      });

      return newUrl;
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Try again.";
      setError(message);
      throw err;
    }
  }

  async function handleDelete(id) {
    try {
      await deleteUrl(id);
      setUrls((prev) => prev.filter((item) => item._id !== id));
    } catch {
      setError("Could not delete this link.");
    }
  }

  return (
    <div className="app">
      <div className="background-glow" aria-hidden="true" />

      <header className="header">
        <div className="logo">
          <span className="logo-icon">🔗</span>
          <h1>ShortLink</h1>
        </div>
        <p className="tagline">Turn long links into short ones — instantly.</p>
      </header>

      <main className="main">
        <UrlForm onSubmit={handleShorten} />

        {error && <div className="alert alert-error">{error}</div>}

        <UrlList
          urls={urls}
          loading={loading}
          onDelete={handleDelete}
        />
      </main>

      <footer className="footer">
        <p>MERN Stack Tiny URL Clone — built for learning</p>
      </footer>
    </div>
  );
}

export default App;
