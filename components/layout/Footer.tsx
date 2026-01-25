import Link from 'next/link';
import { FaCar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gold p-2 rounded-lg">
                <FaCar className="text-xl text-white" />
              </div>
              <span className="text-xl font-bold">
                Rupali Travel <span className="text-gold">Agency In Shillong</span>
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium car rentals. We offer a wide selection of vehicles to meet all your driving needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cars" className="text-gray-300 hover:text-gold transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="text-gray-300 hover:text-gold transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Car Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Car Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cars?type=Economy" className="text-gray-300 hover:text-gold transition-colors">
                  Economy Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?type=Luxury" className="text-gray-300 hover:text-gold transition-colors">
                  Luxury Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?type=SUV" className="text-gray-300 hover:text-gold transition-colors">
                  SUVs
                </Link>
              </li>
              <li>
                <Link href="/cars?type=Sports" className="text-gray-300 hover:text-gold transition-colors">
                  Sports Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?type=Electric" className="text-gray-300 hover:text-gold transition-colors">
                  Electric Cars
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-gold mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  Milan Compound, Upper Mawprem, Garikhana, Shillong, Meghalaya 793002
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-gold flex-shrink-0" />
                <a href="tel:+8415038275" className="text-gray-300 hover:text-gold transition-colors">
                  +91 84150 38275
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-gold flex-shrink-0" />
                <a href="mailto:rupalitravelagency@gmail.com" className="text-gray-300 hover:text-gold transition-colors">
                  rupalitravelagency@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                <strong>Hours:</strong><br />
                Mon-Fri: 8:00 AM - 8:00 PM<br />
                Sat-Sun: 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Rupali Travel Agency In Shillong. All rights reserved.{' '}
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link href="/terms-of-service" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
