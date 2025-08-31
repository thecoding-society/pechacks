// components/Footer.tsx
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Left Section */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-extrabold">PEC Hacks</h2>
          <p className="text-lg mt-2">Tamil Nadu&apos;s Largest Hackathon*</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4 text-xl">
            <Link
              href="https://github.com/thecoding-society"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-gray-400 transition-colors"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://x.com/PECHacks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://www.instagram.com/pechacks/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-400 transition-colors"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.linkedin.com/company/pec-hacks/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-400 transition-colors"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://discord.gg/3nwwVtSz" // Replace with actual Discord link
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="hover:text-indigo-400 transition-colors"
            >
              <FaDiscord />
            </Link>
          </div>
        </div>

        {/* Middle Section */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold">Venue Address</h3>
          <p className="mt-2">
            Panimalar Engineering College,
            <br />
            Nazarathpettai, Poonamallee,
            <br />
            Chennai, Tamil Nadu - 600123
          </p>
          <h3 className="text-xl font-bold mt-6">Branding Guidelines</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="http://assets.pechacks.org/"
                className="text-red-500 hover:underline"
              >
                › PEC Hacks Branding Asset
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold">Additional Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="https://www.panimalar.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                › College Website
              </Link>
            </li>
            <li>
              <Link
                href="https://coding.peccsbs.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                › The Coding Society
              </Link>
            </li>
          </ul>
        </div>

        {/* Map Section */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold mb-4">Location</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7920451208224!2d80.07288927484274!3d13.048904887273663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261c68a9f3031%3A0xab41c8bdcf32ad47!2sPanimalar%20Engineering%20College!5e0!3m2!1sen!2sin!4v1756634251679!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} PEC Hacks. All rights reserved.</p>
      </div>
    </footer>
  );
}
