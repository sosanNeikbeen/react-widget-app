import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("http://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };

    search();
  }, [debouncedTerm]);

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">
        {results.map((result) => {
          const regex = /(<([^>]+)>)/gi; //NEW
          const cleanSnippet = result.snippet.replace(regex, "");
          return (
            <div key={result.pageid} className="item">
              <div className="right floated content">
                <a
                  className="ui button"
                  href={`http://en.wikipedia.org?curid=${result.pageid}`}
                >
                  Go
                </a>
              </div>
              <div className="content">
                <div className="header">{result.title}</div>
                {/* <span
                  dangerouslySetInnerHTML={{ __html: result.snippet }}
                ></span> */}
                {cleanSnippet}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
