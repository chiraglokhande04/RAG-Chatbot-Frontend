import React from "react";
import "../styles/Message.scss";

function Message({ role, text, sources }) {
  return (
    <div className={`message ${role}`}>
      <div className="bubble">
        <p>{text}</p>
        {sources && sources.length > 0 && (
          <div className="sources">
            <small>Sources:</small>
            <ul>
              {sources.map((s, i) => (
                <li key={i}>
                  <a href={s} target="_blank" rel="noopener noreferrer">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
