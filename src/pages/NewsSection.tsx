import { Award, Truck, Car, TrendingUp } from "lucide-react";

const NewsSection = () => {
  const newsItems = [
    {
      type: "Industry",
      icon: <Car className="w-6 h-6 text-red-600" />,
      title: "Electric Vehicle Market Surge in India",
      date: "January 15, 2024",
      snippet: "Electric vehicle sales have increased by 45% in the past year, signaling a major shift in automotive consumption.",
      tag: "Industry Trend",
      image: "https://i.ibb.co.com/Q9TT8cJ/element14-introduces-latest-innovation-from-Raspberry-Pi-400x231.png"
    },
    {
      type: "Company",
      icon: <Award className="w-6 h-6 text-red-600" />,
      title: "Carizon Wins Best Online Car Retailer Award",
      date: "February 3, 2024",
      snippet: "Recognized for exceptional customer service and innovative digital car buying experience.",
      tag: "Achievement",
      image: "https://i.ibb.co.com/W5LjBQT/award-ceremony-nomination-name-podium-260nw-2480588173.webp"
    },
    {
      type: "Technology",
      icon: <Truck className="w-6 h-6 text-red-600" />,
      title: "Autonomous Driving Technologies Advancing",
      date: "January 22, 2024",
      snippet: "Major automotive manufacturers are investing heavily in self-driving vehicle technologies.",
      tag: "Tech Innovation",
      image: "https://i.ibb.co.com/5Lr6q6v/autonomous-400x231.jpg"
    },
    {
      type: "Market",
      icon: <TrendingUp className="w-6 h-6 text-red-600" />,
      title: "SUV Segment Continues to Dominate Market",
      date: "February 10, 2024",
      snippet: "SUV sales have grown 30% compared to last year, showing strong consumer preference.",
      tag: "Market Analysis",
      image: "https://i.ibb.co.com/89nH1xS/f0695b797a324b18ade4dfc05d417718.jpg"
    }
  ];

  return (
    <div id='news' className="b py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="lg:text-3xl md:text-2xl text-2xl font-bold text-red-600 mb-4">Latest News & Updates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest trends, technologies, and achievements in the automotive world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {item.icon}
                  <span className="ml-2 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 text-justify">{item.snippet}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{item.date}</span>
                  <a href="#" className="text-red-600 hover:text-red-800 text-sm font-semibold">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default NewsSection;