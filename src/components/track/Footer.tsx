
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PackExpress</h3>
            <p className="text-gray-600 text-sm">
              Service de livraison professionnel et fiable pour tous vos besoins d'expédition.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/track" className="text-gray-600 hover:text-gray-900 transition-colors">Suivi de colis</a></li>
              <li><a href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Conditions générales</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-600">
              <p>123 Rue de la Livraison</p>
              <p>75000 Paris, France</p>
              <p className="mt-2">Email: contact@post.ch</p>
              <p>Tél: +41 0848 888 888</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; 2024 PackExpress. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
