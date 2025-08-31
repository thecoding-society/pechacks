"use client";

import React, { useState, useEffect } from "react";
import { SpaceSectionHeader } from "../SpaceSectionHeader";

const ClashSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div className="main-container "  id="Domains">
      <SpaceSectionHeader title="Domains" />

      {isMobile ? (
        // Mobile Vertical Layout with always visible names
        <div className="mobile-container">
          {[
            {
              id: "c1",
              title: "Digital Healthcare",
              bgImage:
                "https://img.freepik.com/premium-vector/health-care-medical-innovation-technologymedical-health-protection-shield-dark-blue-background_387612-63.jpg",
            },
            {
              id: "c2",
              title: "Financial Technology",
              bgImage:
                "https://img.freepik.com/premium-vector/financial-technology-concept-business-world-class-design-icon-fintech-things-dark-blue_666034-334.jpg",
            },
            {
              id: "c3",
              title: "Education Technology",
              bgImage:
                "https://www.verdict.co.uk/wp-content/uploads/2023/03/GettyImages-1367728822.jpg",
            },
            {
              id: "c4",
              title: "Sustainability & Green Tech",
              bgImage:
                "https://static.vecteezy.com/system/resources/thumbnails/007/473/082/small/eco-technology-technology-convergence-green-computing-and-it-ethics-photo.jpg",
            },
            {
              id: "c5",
              title: "Open Innovation",
              bgImage:
                "https://t4.ftcdn.net/jpg/16/13/16/31/360_F_1613163154_FVV6WeupBuysxFqWs3bRimbfUexbtt16.jpg",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="mobile-slide"
              style={{ backgroundImage: `url(${item.bgImage})` }}
            >
              <div className="slide-content">
                <div className="icon">{item.id.charAt(1)}</div>
                <div className="description">
                  <h4>{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Horizontal Layout (original)
        <div className="wrapper">
          <div className="container1">
            <input type="radio" name="slide" id="c1" defaultChecked />
            <label htmlFor="c1" className="clash">
              <div className="marvel">
                <div className="icon">1</div>
                <div className="description">
                  <h4>Digital Healthcare</h4>
                </div>
              </div>
            </label>

            <input type="radio" name="slide" id="c2" />
            <label htmlFor="c2" className="clash">
              <div className="marvel">
                <div className="icon">2</div>
                <div className="description">
                  <h4>Financial Technology</h4>
                </div>
              </div>
            </label>

            <input type="radio" name="slide" id="c3" />
            <label htmlFor="c3" className="clash">
              <div className="marvel">
                <div className="icon">3</div>
                <div className="description">
                  <h4>Education Technology</h4>
                </div>
              </div>
            </label>

            <input type="radio" name="slide" id="c4" />
            <label htmlFor="c4" className="clash">
              <div className="marvel">
                <div className="icon">4</div>
                <div className="description">
                  <h4>Sustainability & Green Tech</h4>
                </div>
              </div>
            </label>

            <input type="radio" name="slide" id="c5" />
            <label htmlFor="c5" className="clash">
              <div className="marvel">
                <div className="icon">5</div>
                <div className="description">
                  <h4>Open Innovation</h4>
                </div>
              </div>
            </label>
          </div>
        </div>
      )}

      <style jsx>{`
        .main-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0;
          background: transparent;
          relative;
        }

        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 2rem;
        }

        .container1 {
          height: 400px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
        }

        .clash {
          width: 80px;
          border-radius: 0.75rem;
          background-size: cover;
          cursor: pointer;
          overflow: hidden;
          border-radius: 2rem;
          margin: 0 10px;
          display: flex;
          align-items: flex-end;
          transition: 0.6s cubic-bezier(0.28, -0.03, 0, 0.99);
          box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.8);
        }

        .clash > .marvel {
          color: white;
          display: flex;
          flex-wrap: nowrap;
        }

        .clash > .marvel > .icon {
          background: #223;
          color: white;
          border-radius: 50%;
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 15px;
        }

        .clash > .marvel > .description {
          display: flex;
          justify-content: center;
          flex-direction: column;
          overflow: hidden;
          height: 80px;
          width: 520px;
          opacity: 0;
          transform: translateY(30px);
          transition-delay: 0.3s;
          transition: all 0.3s ease;
        }

        .description h4 {
          text-transform: uppercase;
          color: white;
        }

        input {
          display: none;
        }

        input:checked + label {
          width: 600px;
        }

        input:checked + label .description {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .clash[for="c1"] {
          background-image: url("https://img.freepik.com/premium-vector/health-care-medical-innovation-technologymedical-health-protection-shield-dark-blue-background_387612-63.jpg");
        }
        .clash[for="c2"] {
          background-image: url("https://img.freepik.com/premium-vector/financial-technology-concept-business-world-class-design-icon-fintech-things-dark-blue_666034-334.jpg");
        }
        .clash[for="c3"] {
          background-image: url("https://www.verdict.co.uk/wp-content/uploads/2023/03/GettyImages-1367728822.jpg");
        }
        .clash[for="c4"] {
          background-image: url("https://static.vecteezy.com/system/resources/thumbnails/007/473/082/small/eco-technology-technology-convergence-green-computing-and-it-ethics-photo.jpg");
        }
        .clash[for="c5"] {
          background-image: url("https://t4.ftcdn.net/jpg/16/13/16/31/360_F_1613163154_FVV6WeupBuysxFqWs3bRimbfUexbtt16.jpg");
        }

        /* Mobile Styles */
        .mobile-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 400px;
          gap: 1rem;
          margin-top: 2rem;
        }

        .mobile-slide {
          height: 100px;
          border-radius: 1rem;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          position: relative;
        }

        .mobile-slide::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
          z-index: 1;
        }

        .slide-content {
          display: flex;
          align-items: center;
          padding: 0 1rem;
          color: white;
          width: 100%;
          z-index: 2;
          position: relative;
        }

        .mobile-slide .icon {
          background: rgba(34, 34, 51, 0.9);
          color: white;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 15px;
          flex-shrink: 0;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .mobile-slide .description {
          opacity: 1;
          flex: 1;
        }

        .mobile-slide .description h4 {
          margin: 0;
          font-size: 1.1rem;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
        }

        @media (max-width: 768px) {
          .wrapper {
            display: none;
          }
        }

        @media (min-width: 769px) {
          .mobile-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ClashSlider;
