interface ToastViewportProps {
  children: React.ReactNode;
}

/** 토스트 팝업이 나올 뷰포트 */
const ToastViewport = ({ children }: ToastViewportProps) => {
  return (
    <ul
      className="fixed bottom-32 left-0 right-0 z-100 flex flex-col items-center justify-start gap-1"
      role="list"
      aria-live="polite"
    >
      {children}
    </ul>
  );
};
export default ToastViewport;
