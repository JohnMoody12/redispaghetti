const EmptyCard = () => {
  return (
    <div>
      <div className=" bg-cyan-600 mt-5 rounded-xl sm:min-w-[500px] md:min-w-[700px] pb-5">
        <div className="flex items-center justify-start">
          <h3 className=" text-m my-2 mr-5 text-red-300">Title:</h3>
          <div className="text-slate-200"></div>
        </div>
        <div className=" text-2xl my-2 text-red-400">Question:</div>

        <div className=" h-[75px] text-2xl bg-blue-200 rounded-xl"></div>
      </div>
    </div>
  );
};
export default EmptyCard;
