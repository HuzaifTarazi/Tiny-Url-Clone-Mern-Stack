import { useState } from "react";
import { getShortLink } from "../api";

function UrlForm({ onSubmit }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!input.trim()) return;

    setSubmitting(true);
    setCopied(false);

    try {
      const newUrl = await onSubmit(input.trim());
      setResult(newUrl);
      setInput("");
    } catch {
      setResult(null);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopy() {
    if (!result) return;

    const shortLink = getShortLink(result.shortCode);
    await navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="card form-card">
      <h2>Paste your long URL</h2>

      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="url"
          placeholder="https://example.com/very/long/link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting || !input.trim()}>
          {submitting ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {result && (
        <div className="result-box">
          <p className="result-label">Your short link is ready!</p>
          <div className="result-row">
            <a
              href={getShortLink(result.shortCode)}
              target="_blank"
              rel="noopener noreferrer"
              className="short-link"
            >
              {getShortLink(result.shortCode)}
            </a>
            <button type="button" className="btn-copy" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default UrlForm;
