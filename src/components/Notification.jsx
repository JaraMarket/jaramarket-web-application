import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="glass"
              style={{
                padding: '16px 24px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minWidth: '300px',
                boxShadow: 'var(--shadow-lg)',
                borderLeft: `4px solid ${getTypeColor(n.type)}`
              }}
            >
              {getTypeIcon(n.type)}
              <span style={{ fontSize: '14px', fontWeight: '500', flex: 1 }}>{n.message}</span>
              <button onClick={() => removeNotification(n.id)} style={{ background: 'none', color: 'var(--text-secondary)' }}>
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext);

const getTypeColor = (type) => {
  switch (type) {
    case 'success': return '#10b981';
    case 'error': return '#ef4444';
    case 'warning': return '#ff8c00';
    default: return 'var(--primary)';
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'success': return <CheckCircle size={20} color="#10b981" />;
    case 'error': return <AlertCircle size={20} color="#ef4444" />;
    case 'warning': return <AlertCircle size={20} color="#ff8c00" />;
    default: return <Info size={20} color="var(--primary)" />;
  }
};
