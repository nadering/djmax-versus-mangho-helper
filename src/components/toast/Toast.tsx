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
      className="fixed bottom-32 flex items-center justify-center px-3 py-1 mx-auto bg-black/60 text-white font-medium rounded-md select-none"
    >
      {children}
    </div>
  );
};
export default Toast;
