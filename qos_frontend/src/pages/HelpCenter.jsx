import React from "react";
import { useNavigate } from "react-router-dom";
import { Book, MessageSquare, ExternalLink, Search } from "lucide-react";

/**
 * Help Center Page with FAQs and navigation.
 */
const HelpCenter = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      q: "What is Fog Computing?",
      a: "Fog computing is a decentralized computing infrastructure in which data, compute, storage and applications are located somewhere between the data source and the cloud."
    },
    {
      q: "How does the IEERA-Fog algorithm work?",
      a: "It uses an intelligent energy-efficient resource allocation strategy to prioritize tasks based on their QoS requirements while minimizing the power consumption of fog nodes."
    },
    {
      q: "How do I run a custom simulation?",
      a: "Navigate to the 'Simulation' page, configure your fog node parameters, and click 'Launch Simulation' to see real-time results."
    }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: "900px", margin: "0 auto" }}>
      
      {/* HEADER */}
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          How can we help?
        </h1>

        <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
          <Search
            size={20}
            style={{
              position: "absolute",
              left: "1.25rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)"
            }}
          />
          <input
            type="text"
            placeholder="Search documentation..."
            className="form-input"
            style={{
              paddingLeft: "3.5rem",
              borderRadius: "2rem",
              height: "50px"
            }}
          />
        </div>
      </header>

      {/* DOCUMENTATION & COMMUNITY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}
      >
        {/* Documentation */}
        <div
          className="card"
          onClick={() => navigate("/docs")}
          style={{
            textAlign: "center",
            padding: "2rem",
            cursor: "pointer",
            transition: "all 0.25s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
        >
          <Book
            size={32}
            color="var(--primary)"
            style={{ marginBottom: "1rem" }}
          />
          <h4>Documentation</h4>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              margin: "0.75rem 0"
            }}
          >
            Detailed guides on system architecture and IEERA-Fog.
          </p>
          <div
            style={{
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontWeight: "500"
            }}
          >
            Read More <ExternalLink size={14} />
          </div>
        </div>

        {/* Community */}
        <div
          className="card"
          onClick={() => navigate("/community")}
          style={{
            textAlign: "center",
            padding: "2rem",
            cursor: "pointer",
            transition: "all 0.25s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
        >
          <MessageSquare
            size={32}
            color="#10b981"
            style={{ marginBottom: "1rem" }}
          />
          <h4>Community Support</h4>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              margin: "0.75rem 0"
            }}
          >
            Join our discussion forums for technical help.
          </p>
          <div
            style={{
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontWeight: "500"
            }}
          >
            Join Chat <ExternalLink size={14} />
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="glass-card">
        <h3 style={{ marginBottom: "1.5rem" }}>
          Frequently Asked Questions
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom:
                  i !== faqs.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                paddingBottom: "1.5rem"
              }}
            >
              <h5
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                  color: "var(--text-main)"
                }}
              >
                {faq.q}
              </h5>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9375rem"
                }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;