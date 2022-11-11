import Image from "next/image";
import React from "react";
import me from "../../public/pic.jpg";

const RegistrationFrom: React.FC = () => {
  const registerHandler = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Sumbitted");
  };

  return (
    <div className="w-[80%] mx-auto flex rounded-lg bg-white h-[88vh] gap-10 p-3">
      <div className="flex-[0.3] bg-[#3c37ff] rounded-lg px-9 py-6 flex flex-col justify-between">
        <p className="text-white text-2xl font-semibold lowercase">Logo</p>
        <div>
          <h2 className="text-white text-4xl font-semibold mb-4">
            Start your journey with us.
          </h2>
          <p className="text-gray-300 text-base">
            Discover the world's best... some random paragraph we gonna write
            here about our application.
          </p>
        </div>

        <div className="bg-[#2520E3] py-3 px-4 rounded-lg">
          <p className="text-white text-sm mb-4">
            Simply unbelievable!! I am really satisfied with my projects and
            business.This is absolutely wonderful
          </p>
          <div className="flex gap-2">
            <Image
              src={me}
              height={45}
              width={45}
              className="rounded-xl"
              alt="me"
            />
            <div>
              <h2 className="text-white font-semibold text-sm ">Aman Mandal</h2>
              <p className="text-gray-300 text-xs">Developer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0.7]">
        <h2>Register Here</h2>

        <form onSubmit={registerHandler}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" />

          <label htmlFor="payment">Payment Methods</label>
          <div id="payment">
            <div>Appname</div>
            <div>UPI</div>
            <div>Paypal</div>
          </div>

          <label htmlFor="token-address">Token Address</label>
          <input type="text" id="token-address" />

          <label>Prize</label>
          <input type="text" />

          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationFrom;
