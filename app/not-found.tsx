export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto py-24 px-4 text-center">
      <h1 className="text-4xl font-bold mb-6 text-primary">404 - Page Not Found</h1>
      <p className="mb-8 text-gray-600">Sorry, the page you are looking for does not exist or has been moved.</p>
      <a href="/" className="btn-primary inline-block mb-4">Go Back Home</a>
      <div className="mt-8">
        <a href="/privacy-policy" className="text-gold hover:underline mx-2">Privacy Policy</a>
        <span className="text-gray-400">|</span>
        <a href="/terms-of-service" className="text-gold hover:underline mx-2">Terms of Service</a>
      </div>
    </div>
  );
}
