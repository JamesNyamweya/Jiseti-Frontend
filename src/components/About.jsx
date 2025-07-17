import React from "react";
import Card from "./Card";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const About = () =>{
    const location = useLocation();
    useEffect(() => {
      const hash = location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);
    return (
        <div className="w-[80%] p-7 mx-auto">
          <Card>
            <h2 className="text-[40px] leading-[52px] tracking-[0.4px] font-semibold text-center mb-4">
              About Jiseti
            </h2>
            <p className="text-[#111827] text-[18px] leading-[28px]">
              Jiseti is a civic-tech platform created to tackle one of Kenya’s
              greatest challenges: corruption. We believe every citizen has the
              right — and responsibility — to hold leaders accountable. Through
              Jiseti, users can anonymously or openly report corrupt practices
              and submit intervention requests where government action is
              urgently needed. Our platform bridges the gap between citizens and
              institutions, enabling faster visibility and response. Built for
              integrity. Powered by truth. Rooted in justice.
            </p>
          </Card>
        </div>
    );
}

export default About