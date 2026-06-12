import { toast } from 'react-hot-toast';
export const showNewMessageToast = ({senderName, message}) => {
  // Simple text toast without custom JSX
  toast(
    `💬 ${senderName}: ${message}`,
    {
      duration: 2000,
      position: 'top-right',
      icon: '💬',
      style: {
        background: '#1d232a',
        color: '#fff',
        border: '1px solid #39414a',
        padding: '16px',
        borderRadius: '12px',
      },
    }
  );
};
