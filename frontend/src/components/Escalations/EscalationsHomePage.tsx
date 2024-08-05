import EscalationButton from "./EscalationButton";

const EscalationsHomePage = () => {
  const products: string[] = [
    "PXI",
    "T&S",
    "RAID",
    "DAQmx",
    "SMU",
    "MXI",
    "RF",
    "Avionics",
    "VXI",
  ];
  return (
    <div className="min-w-[100vw] min-h-[80vh] flex justify-center items-center h-max">
      <div className="w-1/2 h-[60vh] grid grid-cols-3 gap-4 ">
        {products.map((product, idx) => (
          <EscalationButton key={idx} productType={product} />
        ))}
      </div>
    </div>
  );
};
export default EscalationsHomePage;
