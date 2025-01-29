import { Globe, ShieldCheck, Star } from "lucide-react";
import img from "../assets/new_car_showroom.webp";
const AboutUsCarizon = () => {
  const companyValues = [
    {
      icon: <Star className="text-red-600 w-12 h-12" />,
      title: "Quality First",
      description:
        "We meticulously inspect and certify every vehicle to ensure top-notch quality and customer satisfaction.",
    },
    {
      icon: <ShieldCheck className="text-red-600 w-12 h-12" />,
      title: "Transparent Transactions",
      description:
        "Honesty and integrity are at the core of our business. No hidden fees, no surprises.",
    },
    {
      icon: <Globe className="text-red-600 w-12 h-12" />,
      title: "Sustainable Mobility",
      description:
        "Committed to reducing carbon footprint by promoting electric and hybrid vehicle options.",
    },
  ];

  const milestones = [
    { year: 2015, event: "Founded in Kolkata with a single showroom" },
    { year: 2018, event: "Expanded to multiple cities across East India" },
    {
      year: 2021,
      event: "Launched comprehensive online car purchasing platform",
    },
    {
      year: 2024,
      event: "Recognized as top online car retailer in the region",
    },
  ];

  return (
    <div className=" min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="lg:text-3xl md:text-2xl text-2xl font-bold text-red-600 mb-6">
              Welcome to Carizon, Your Trusted Car Companion
            </h1>
            <p className="text-gray-600 text-justify leading-relaxed">
              Carizon is more than just a car shop—we're your comprehensive
              automotive solutions partner. With a decade of experience, we've
              revolutionized car buying by combining cutting-edge technology,
              transparent processes, and a customer-first approach.
            </p>
          </div>
          <img
            src={img}
            alt="Carizon Showroom"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Company Values */}
        <div className="bg-white rounded-xl shadow-md p-10">
          <h2 className="text-3xl font-bold text-center mb-10 text-red-600">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 hover:bg-red-50 rounded-xl transition"
              >
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-red-600">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Journey */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl p-10">
          <h2 className="lg:text-3xl md:text-2xl text-2xl font-bold text-center mb-10">
            Our Journey
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-center space-x-6 bg-white/10 p-6 rounded-xl"
              >
                <div className="text-3xl font-bold text-white">
                  {milestone.year}
                </div>
                <p className="text-white">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team and Leadership */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10 text-red-600">
            Our Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Founder & CEO",
                image:
                  "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              },
              {
                name: "Priya Sharma",
                role: "Chief Operations Officer",
                image:
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
              },
              {
                name: "Arun Patel",
                role: "Head of Technology",
                image:
                  "https://i.ibb.co.com/kXX8jc9/good-looking-young-man-stylish-black-hat-sitting-table-with-mobile-phone-mug.jpg",
              },
            ].map((leader, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-red-600">
                    {leader.name}
                  </h3>
                  <p className="text-gray-600">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-red-600 text-white rounded-xl p-16">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Car Journey with Carizon
          </h2>
          <p className="text-xl mb-10">
            Experience seamless car buying, unmatched quality, and exceptional
            customer service.
          </p>
          <button className="bg-white text-red-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition">
            Explore Our Inventory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCarizon;
