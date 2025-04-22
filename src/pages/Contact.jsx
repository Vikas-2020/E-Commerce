import emailjs from "emailjs-com";
import { useState } from "react";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .send(
        "service_316fu9e",
        "template_etxiz4d",
        formData,
        "gVMyltbFAkjzLInon"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen px-6 py-16 bg-white flex items-center justify-center">
      <div
        className="max-w-3xl w-full bg-white rounded-lg shadow-[0px_4px_15px_2px_rgba(0,0,0,0.3)]npm start
       p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-gray-700 mb-6">
          We'd love to hear from you! Whether you have a question about our
          products, your order, or anything else — we're happy to help.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              rows="5"
              name="message"
              className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
