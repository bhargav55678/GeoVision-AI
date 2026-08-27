const LoadingSpinner = () => {

  return (

    <div
      className="
        flex
        items-center
        gap-3
      "
    >

      <span
        className="
          h-5
          w-5
          animate-spin
          rounded-full
          border-2
          border-slate-950/30
          border-t-slate-950
        "
      />

      <span>
        Analyzing...
      </span>

    </div>

  );

};


export default LoadingSpinner;