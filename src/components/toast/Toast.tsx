import { useEffect, useRef } from "react";

interface ToastProps {
  children: React.ReactNode;
  ttl: number;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toast = ({ children, ttl, setter }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setter(false);
    }, ttl);

    return () => clearTimeout(timer);
  }, [ttl, setter]);

  return (
    <div
      ref={toastRef}
      className="fixed bottom-32 z-50 flex items-center justify-center px-3 py-1 mx-auto bg-black/80 text-white font-medium rounded-md shadow-lg select-none
        animate-fade-in-scale"
    >
      {children}
    </div>
  );
};
export default Toast;
