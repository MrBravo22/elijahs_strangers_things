import React from 'react';

const ContactUs = ()=> {
  return (
    <div>
      <h1>Contact Us</h1>
      <label>Name</label>
      <input></input>
      <label>Phone</label>
      <input></input>
      <label>Email</label>
      <input></input>
      <label>Inquiry Summary</label>
      <textarea type="text" placeholder="Hello World" rows="6" cols="20" wrap="hard" maxLength="500" name="message"></textarea>
    </div>
  );
};

export default ContactUs;