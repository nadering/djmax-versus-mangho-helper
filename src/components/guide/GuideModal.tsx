import GuideImg from "/assets/djmax-versus-mangho-helper-guide.png";
import { CircleXIcon, HelpCircleIcon } from "lucide-react";
import { useState } from "react";

/** 가이드 이미지 모달 */
const GuideModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 버튼 */}
      <button
        title="가이드"
        className="absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer duration-100 hover:scale-120"
        onClick={() => setIsOpen(true)}
      >
        <HelpCircleIcon className="w-6 h-6" />
      </button>

      {/* 모달 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 select-none"
          onClick={() => setIsOpen(false)} // 배경 클릭 시 닫기
        >
          <div
            className="bg-white rounded-lg p-4 shadow-lg max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 모달 유지
          >
            <div className="flex justify-end pb-1">
              <button
                className="text-gray-500 hover:text-black text-sm cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <CircleXIcon className="w-5 h-5" />
              </button>
            </div>
            <img
              src={GuideImg}
              alt="가이드 이미지"
              className="w-full h-auto rounded select-none"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default GuideModal;
