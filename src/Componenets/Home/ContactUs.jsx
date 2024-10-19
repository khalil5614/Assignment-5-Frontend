import React from "react";

const ContactUs = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-12">Contact Us</h1>

      <div className="w-11/12 md:w-5/12">
        <label className="input input-bordered flex items-center gap-2 m-2">
          Name
          <input type="text" className="grow pl-2" placeholder="Type Here" />
        </label>

        <label className="input input-bordered flex items-center gap-2 m-2">
          Email
          <input
            type="text"
            className="grow pl-2"
            placeholder="example@site.com"
          />
        </label>
        <label className="input input-bordered flex items-center  m-2">
          Subject
          <input type="text" className="grow pl-2" placeholder="Type Here" />
        </label>
        <textarea
          placeholder="Message"
          className="textarea textarea-bordered textarea-lg w-full m-2"
        ></textarea>

        <button className="btn btn-warning ml-2 px-10">Submit</button>
      </div>
    </div>
  );
};

export default ContactUs;
