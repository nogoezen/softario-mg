import { X } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <button onClick={onClose} className="absolute top-4 right-4">
        <X className="h-6 w-6" />
      </button>
      <nav className="mt-16 px-4">
        {/* Ajoutez ici vos liens de menu */}
      </nav>
    </div>
  );
}