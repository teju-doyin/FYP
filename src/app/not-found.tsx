'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Search, RefreshCw } from 'lucide-react';

export default function Custom404() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-indigo-600 mb-4 animate-bounce">
            404
          </div>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Don&apos;t worry, it happens to the best of us!
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              <Home size={20} />
              Go Home
            </Link>
            
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              <RefreshCw size={20} />
              Refresh
            </button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="bg-white/80 backdrop-blur rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            What can you do?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Search size={16} className="text-indigo-600" />
              <span>Check the URL spelling</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Home size={16} className="text-indigo-600" />
              <span>Visit our homepage</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <RefreshCw size={16} className="text-indigo-600" />
              <span>Try refreshing the page</span>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Still having trouble? {' '}
            <Link 
              href="/contact" 
              className="text-indigo-600 hover:text-indigo-700 font-medium underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}