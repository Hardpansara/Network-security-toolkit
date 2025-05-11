
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <FrontLayout>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">Last updated: April 7, 2025</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p className="mb-4">
              Network Guardian ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our network security application.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us when you use our application, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Personal information (name, email address, etc.) when you create an account</li>
              <li>Network data including connected devices, IP addresses, and MAC addresses</li>
              <li>Usage data and application preferences</li>
              <li>Feedback and support requests</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Detect and address technical issues</li>
              <li>Send you technical notices and security alerts</li>
              <li>Monitor usage patterns and analyze trends</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Storage and Security</h2>
            <p className="mb-4">
              We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. All data is stored locally on your device by default, unless you explicitly enable cloud synchronization features.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@networkguardian.com.
            </p>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default PrivacyPolicyPage;
