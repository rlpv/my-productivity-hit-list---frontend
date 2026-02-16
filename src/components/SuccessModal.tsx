interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      {/* 1. Global CSS for the Flip Animation */}
      <style>
        {`
          @keyframes flipHorizontal {
            0% { transform: scaleX(1); }
            50% { transform: scaleX(-1); }
            100% { transform: scaleX(1); }
          }
          .animate-flip-horizontal {
            animation: flipHorizontal 2s ease-in-out infinite;
          }
        `}
      </style>

      {/* Main Container */}
      <div className="bg-secondary border-4 border-black rounded-[40px] w-full max-w-xs p-10 flex flex-col items-center shadow-lg">
        {/* Success Icon Section */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center border-4 border-black">
            <svg
              className="w-14 h-14 text-secondary animate-flip-horizontal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title Text */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold font-indie leading-tight text-black">
            {title}
          </h2>
        </div>

        {/* Message Text */}
        <div className="text-center mb-8">
          <p className="text-xl font-medium font-indie leading-tight text-black">
            {message}
          </p>
        </div>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="bg-[#66BB84] border-2 border-black rounded-2xl px-12 py-1 text-xl font-bold font-indie
            shadow-[0px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-0.5 hover:shadow-none transition-all active:scale-95"
        >
          ok
        </button>
      </div>
    </div>
  );
}
