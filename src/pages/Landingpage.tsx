import logomain from "../assets/logomain.png";

function Landingpage() {
  return (
    <div className="bg-secondary flex flex-col items-center justify-center h-screen">
      <img src={logomain} alt="Logo" className="w-105 h-95 absoluter top-30" />

      <div className="mt-10">
        <button className="bg-white border border-black w-42.5 h-12.5 rounded-full font-indie text-xl shadow-lg shadow-black/10 hover:shadow-xl transition-shadow">
          Get started
        </button>
      </div>
    </div>
  );
}

export default Landingpage;
