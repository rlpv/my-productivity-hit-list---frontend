interface AnalyticsBoxProps {
  title: string;
  count: number;
}

const AnalyticsBox: React.FC<AnalyticsBoxProps> = ({ title, count }) => {
  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Title above the box */}
      <h3 className="text-black font-indie text-xl font-bold mb-2">{title}</h3>

      {/* Outer Lavender Box */}
      <div className="w-22 h-22 bg-[#D6DFFF] border-2 border-black rounded-[20px] p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        {/* Inner White Box */}
        <div className="w-full h-full bg-[#D6DFFF] border-2 border-black rounded-[15px] flex items-center justify-center">
          <p className="text-5xl font-indie font-bold text-black">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBox;
