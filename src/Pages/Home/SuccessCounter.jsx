import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaFemale, FaMale, FaRing } from "react-icons/fa";

const CounterCard = ({ label, count, icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
    >
      <div className="mb-4">{icon}</div>
      <div className="text-2xl font-extrabold text-gray-700">
       
        <CountUp
          start={0}
          end={inView ? count : 0}
          duration={2}
          separator=","
          redraw={true}  
        />
      </div>
      <p className="mt-2 text-xl font-medium text-gray-700">{label}</p>
    </div>
  );
};

const SuccessCounter = () => {
  const counters = [
    {
      label: "Girls Biodata",
      count: 2543,
      icon: <FaFemale size={50} className="text-pink-500" />,
    },
    {
      label: "Boys Biodata",
      count: 2768,
      icon: <FaMale size={50} className="text-blue-500" />,
    },
    {
      label: "Marriages Completed",
      count: 1349,
      icon: <FaRing size={50} className="text-green-500" />,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Our Success Counters</h2>
        <div data-aos="zoom-in" className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {counters.map((counter, idx) => (
            <CounterCard key={idx} {...counter} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
