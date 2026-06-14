import React from "react";
import { MessageSquare, ExternalLink } from "lucide-react";

const Community = () => {
  const communities = [
    {
      title: "Stack Overflow - Fog Computing",
      description:
        "Ask technical questions and explore solutions from developers.",
      link: "https://stackoverflow.com/questions/tagged/fog-computing"
    },
    {
      title: "GitHub Edge Computing Projects",
      description:
        "Explore open-source fog and edge computing repositories.",
      link: "https://github.com/topics/edge-computing"
    },
    {
      title: "IEEE Xplore Digital Library",
      description:
        "Research papers and academic resources on distributed systems.",
      link: "https://ieeexplore.ieee.org/"
    }
  ];

  return (
    <div className="animate-fade-in page-container">
      <header className="page-header">
        <MessageSquare size={28} />
        <div>
          <h1>Community Support</h1>
          <p>Connect with developers and researchers in Fog & Edge Computing.</p>
        </div>
      </header>

      <div className="resource-grid">
        {communities.map((item, index) => (
          <div key={index} className="resource-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <button
              className="resource-link"
              onClick={() => window.open(item.link, "_blank")}
            >
              Open Community <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;