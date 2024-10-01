import Link from 'next/link';
import Image from 'next/image';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '200px'
};

const center = {
  lat: 48.8566, // Latitude de Paris
  lng: 2.3522 // Longitude de Paris
};

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Nous contacter</h3>
            <p>123 Rue du Commerce, 75001 Paris</p>
            <p>Tél : 01 23 45 67 89</p>
            <p>Email : contact@example.com</p>
            <div className="mt-4 h-48">
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={14}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Link href="/" className="block hover:text-gray-300 transition-colors">Accueil</Link>
              <Link href="/products" className="block hover:text-gray-300 transition-colors">Produits</Link>
              <Link href="/about" className="block hover:text-gray-300 transition-colors">À propos</Link>
              <Link href="/contact" className="block hover:text-gray-300 transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}