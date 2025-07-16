import React from "react";
import Card from "./Card";

const Working = () => {
  return (
    <div className="bg-[#F9FAFB] flex flex-col md:flex-row items-center justify-center p-10 m-6 gap-10 rounded-xl">
      <div className="w-full md:w-1/2">
        <Card>
          <h2 className="text-[40px] leading-[52px] tracking-[0.4px] font-semibold text-center mb-4">
            How Jiseti Works.
          </h2>
          <div class="space-y-6 text-base font-roboto leading-relaxed">
            <p className="text-[18px] leading-[28px]">
              <strong>1. Create an Account</strong> – Sign up securely.
            </p>
            <p className="text-[18px] leading-[28px]">
              <strong>2. Submit a Report</strong> – Choose between Red-Flag or
              Intervention.
            </p>
            <p className="text-[18px] leading-[28px]">
              <strong>3. Track the Status</strong> – Admins may update your
              report.
            </p>
            <p className="text-[18px] leading-[28px]">
              <strong>4. Be Part of the Solution.</strong> – Your voice helps
              build a better nation.
            </p>
          </div>
          <div className="mt-6 flex justify-center"></div>
        </Card>
      </div>
      <div className="flex-shrink-0">
        <img
          src="src/assets/oversight_rafiki.svg"
          alt="Evidence Illustration"
          className="h-100 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Working