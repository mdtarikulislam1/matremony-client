import { useState } from "react";

export default function MatrimonySections() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email!");
      return;
    }

    console.log("Subscribed Email:", email);

    setMessage("🎉 Thanks for subscribing!");
    setEmail(""); 
  };
  return (
    <div className="bg-white text-gray-800">
      {/* Sales Promotion */}
      <section className="py-16 px-6 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">Find Your Perfect Match</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Join thousands of happy couples who found their soulmate through our
          Matrimony platform. Exclusive premium plans available now!
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          <a href="matremony/allData"> Explore Premium Plans</a>
        </button>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Happy Stories</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <p className="italic">
              “I never believed in arranged matches until I tried this website.
              Now I’m happily married!”
            </p>
            <h4 className="mt-4 font-semibold text-blue-600">
              — Rahim & Ayesha
            </h4>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <p className="italic">
              “The process was smooth, and I met the love of my life. Thank you
              for making it possible.”
            </p>
            <h4 className="mt-4 font-semibold text-blue-600">
              — Tanvir & Sultana
            </h4>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <p className="italic">
              “Trustworthy platform with genuine profiles. Highly recommend to
              everyone looking for a partner.”
            </p>
            <h4 className="mt-4 font-semibold text-blue-600">
              — Hasan & Nargis
            </h4>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Get the latest success stories, dating tips, and exclusive offers
          directly in your inbox.
        </p>
        <div className="bg-white py-10 px-5 text-center">
          <h2 className="text-2xl font-bold mb-4">
            📩 Subscribe to our Newsletter
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
          {message && (
            <p className="mt-3 text-green-600 font-medium">{message}</p>
          )}
        </div>
      </section>
    </div>
  );
}
