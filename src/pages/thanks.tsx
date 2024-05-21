import React from "react";

const ThanksPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <h1 className="text-6xl">Well done you!</h1>
      <p className="text-xl mt-20 w-3/4">
        Together we have just sent an enquiry to each partner you shortlisted
        and put you in copy. Please check your email and feel free to respond to
        that email thread with the supplier in case you want to give them a
        friendly nudge. 😊
      </p>
    </div>
  );
};

export default ThanksPage;
