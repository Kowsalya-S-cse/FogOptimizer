import React from "react";
import { ExternalLink, BookOpen } from "lucide-react";

const Docs = () => {
  const resources = [
    {
      title: "OpenFog Architecture Overview",
      description:
        "Industry reference architecture for fog computing systems.",
      link: "https://www.iiconsortium.org/openfog.htm"
    },
    {
      title: "Linux Foundation Edge Resources",
      description:
        "Guides and whitepapers on edge and distributed computing.",
      link: "https://www.lfedge.org/resources/"
    },
    {
      title: "IBM Fog Computing Guide",
      description:
        "Practical explanation of fog computing in IoT environments.",
      link: "https://www.ibm.com/topics/fog-computing"
    },
    {
      title: "Microsoft Azure IoT Edge",
      description:
        "Learn how edge devices integrate with cloud systems.",
      link: "https://learn.microsoft.com/en-us/azure/iot-edge/"
    },
    {
      title: "AWS Architecture Center",
      description:
        "Best practices for distributed and cloud-edge systems.",
      link: "https://aws.amazon.com/architecture/"
    }
  ];

  return (
    <div className="animate-fade-in page-container">
      <header className="page-header">
        <BookOpen size={28} />
        <div>
          <h1>Documentation</h1>
          <p>Explore technical guides and architecture references for Fog Computing.</p>
        </div>
      </header>

      <div className="resource-grid">
        {resources.map((item, index) => (
          <div key={index} className="resource-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <button
              className="resource-link"
              onClick={() => window.open(item.link, "_blank")}
            >
              Visit Resource <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Docs;