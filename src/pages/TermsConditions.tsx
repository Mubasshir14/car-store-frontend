import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Terms and Conditions - <span className="text-red-500">Carizon</span>
        </h1>

        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>Welcome to Carizon. By accessing and using our website and services, you agree to comply with these Terms and Conditions. These terms govern your use of our car e-commerce platform and all related services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Vehicle Purchase Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All vehicle listings are subject to availability and prior sale.</li>
              <li>Prices are subject to change without notice.</li>
              <li>Vehicle descriptions and specifications are believed to be accurate but not guaranteed.</li>
              <li>A deposit may be required to secure a vehicle purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Warranty Information</h2>
            <p>Carizon provides standard manufacturer warranties on all new vehicles. Used vehicles may come with remaining manufacturer warranty or a limited dealer warranty. Extended warranty options are available for purchase.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Return Policy</h2>
            <p>We offer a 7-day/500-kilometer money-back guarantee on all vehicle purchases, subject to the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vehicle must be returned in the same condition as delivered</li>
              <li>No modifications or alterations</li>
              <li>Complete documentation must be provided</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. User Responsibilities</h2>
            <p>Users must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information during registration and purchase</li>
              <li>Maintain the confidentiality of their account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
export default TermsConditions;