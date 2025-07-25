import React from "react";
import Button from "./Button";
import Card from "./Card";
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Container = () => {
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
    <div className="bg-[#F9FAFB] flex flex-col md:flex-row items-center justify-center p-10 m-6 gap-10 rounded-xl">
      <div className="flex-shrink-0">
        <img
          src="src/assets/curious_detective.png"
          alt="Evidence Illustration"
          className="h-100 w-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2">
        <Card>
          <h2 className="text-[40px] leading-[52px] tracking-[0.4px] font-semibold text-center mb-4">
            Empowering Citizens. Exposing Corruption. <br />
            Demanding Action.
          </h2>
          <p className="text-[#111827] text-[18px] leading-[28px]">
            Jiseti gives every Kenyan a voice to report corruption and call for
            government intervention. Together, we build a transparent,
            accountable future — one report at a time.
          </p>
          <div id="about_us" className="mt-6 flex justify-center">
            <Link to="/user_dash">
              <Button color="bg-[#1F2937]" textColor="text-white">
                Report Now
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Container;
