import React, { useEffect, useState } from 'react';

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {};
      const id = Date.now() + Math.random();
      const toast = {
        id,
        message: detail.message || 'Done',
        actionLabel: detail.actionLabel || null,
        actionEvent: detail.actionEvent || null,
        duration: typeof detail.duration === 'number' ? detail.duration : 3000,
      };
      setToasts(prev => [toast, ...prev]);

      // auto-remove after duration
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, toast.duration);
    };

    window.addEventListener('show-toast', handler);
    return () => window.removeEventListener('show-toast', handler);
  }, []);

  const handleAction = (toast) => {
    if (toast.actionEvent) {
      window.dispatchEvent(new Event(toast.actionEvent));
    }
    setToasts(prev => prev.filter(t => t.id !== toast.id));
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto max-w-xs w-full bg-white shadow-lg rounded-lg border overflow-hidden">
          <div className="flex items-center px-4 py-3">
            <div className="flex-1">
              <div className="text-sm text-gray-800 font-medium">{toast.message}</div>
            </div>
            {toast.actionLabel && (
              <button onClick={() => handleAction(toast)} className="ml-3 text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
                {toast.actionLabel}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
