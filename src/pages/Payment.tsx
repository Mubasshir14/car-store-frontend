import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
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
          Payment Information - <span className="text-red-500">Carizon</span>
        </h1>

        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Payment Methods
            </h2>
            <p>We accept the following payment methods:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="border rounded-lg p-4 hover:border-red-500 transition-colors">
                <h3 className="font-semibold mb-2">Direct Payment</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Credit/Debit Cards</li>
                  <li>Bank Transfer</li>
                  <li>Digital Wallets</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4 hover:border-red-500 transition-colors">
                <h3 className="font-semibold mb-2">Financing Options</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Auto Loans</li>
                  <li>Lease Programs</li>
                  <li>Special Financing</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Payment Process
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Vehicle Selection</h3>
                  <p className="text-sm">
                    Choose your desired vehicle and proceed to checkout
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Payment Method</h3>
                  <p className="text-sm">
                    Select your preferred payment method or financing option
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Documentation</h3>
                  <p className="text-sm">
                    Complete necessary paperwork and verify information
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Confirmation</h3>
                  <p className="text-sm">
                    Receive confirmation and delivery details
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Security Guarantee
            </h2>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="text-sm">
                Carizon uses industry-standard encryption and security measures
                to protect your payment information. All transactions are
                processed through secure and verified payment gateways.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Additional Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are in USD unless otherwise stated</li>
              <li>Deposits may be required for certain purchases</li>
              <li>Financing subject to credit approval</li>
              <li>
                Special payment arrangements available for international buyers
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Payment;
