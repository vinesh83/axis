import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  rootId?: string;
}

const Portal = ({ children, rootId = 'modal-root' }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Create modal root if it doesn't exist
    let modalRoot = document.getElementById(rootId);
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = rootId;
      document.body.appendChild(modalRoot);
    }

    return () => {
      setMounted(false);
      // Clean up modal root if empty
      if (modalRoot && !modalRoot.hasChildNodes()) {
        modalRoot.remove();
      }
    };
  }, [rootId]);

  if (!mounted) return null;

  const modalRoot = document.getElementById(rootId) || document.body;
  return createPortal(children, modalRoot);
};

export default Portal;