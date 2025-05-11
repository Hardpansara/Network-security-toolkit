
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';

const TermsPage: React.FC = () => {
  return (
    <FrontLayout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">Last updated: April 7, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using Network Guardian's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily use Network Guardian's application for personal or commercial network security monitoring, subject to the following conditions:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The software may not be modified, copied, distributed, or used for unauthorized purposes</li>
              <li>You may only use the application on networks you own or have explicit permission to monitor</li>
              <li>The application must not be used for any illegal activities or to violate the privacy of others</li>
              <li>All copyright and proprietary notices must be maintained</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">User Responsibilities</h2>
            <p className="mb-4">
              When using Network Guardian, you are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Ensuring you have legal permission to scan and monitor all networks</li>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Using the application in compliance with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
            <p className="mb-4">
              Network Guardian's services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the application will be error-free or uninterrupted, or that defects will be corrected.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall Network Guardian be liable for any damages arising out of the use or inability to use our services, even if we have been notified of the possibility of such damages.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the updated terms on our website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at legal@networkguardian.com.
            </p>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default TermsPage;
