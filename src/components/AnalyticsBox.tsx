interface AnalyticsBoxProps {
  title: string;
  count: number;
}

const AnalyticsBox: React.FC<AnalyticsBoxProps> = ({ title, count }) => {
  return (
    <div className="flex-1 bg-white border-2 border-black rounded-xl p-4 shadow-md shadow-black/10">
      <h3 className="text-black font-indie text-lg font-bold mb-2">{title}</h3>
      <p className="text-4xl font-indie font-bold">{count}</p>
    </div>
  );
};

export default AnalyticsBox;
