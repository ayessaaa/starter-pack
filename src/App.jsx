import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [packColor, setPackColor] = useState("blue");
  const [packScale, setPackScale] = useState(false);
  const [isBox1, setIsBox1] = useState(false);
  const [isBoxHover1, setIsBoxHover1] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPackScale(false);
    }, 500);

    return () => {
      window.clearInterval(timer);
    };
  }, [packColor]);
  return (
    <>
      <div
        className={`absolute inset-0 -z-10 max-h-screen w-full ${packColor}-grid-bg ${packColor}bg transition-all bg-[size:6rem_5rem]`}
      ></div>

      <div className="flex flex-col items-center  transition-all">
        <div
          className={`w-250 absolute mx-auto mt-15 ${
            isBoxHover1 & !isBox1 && "zoom1"
          } ${isBox1 && "zoom"} pack`}
        >
          <img
            src={`/imgs/bgs/${packColor}.PNG`}
            className={`w-250 absolute mx-auto z-0 transition-all pack  animate__animated animate__faster ${
              packScale ? "animate__pulse" : ""
            }`}
          ></img>
          <div className="flex">
            <div
              className={`pointer w-60 ml-65 mt-58  h-85 z-10`}
              onClick={() => {
                setIsBox1(true);
                setIsBoxHover1(false);
              }}
              onMouseEnter={() => {
                if (setIsBox1) setIsBoxHover1(true);
              }}
              onMouseLeave={() => {
                if (setIsBox1) setIsBoxHover1(false);
              }}
            >
              <img
              src="/imgs/x.PNG"
                className={`w-7 ${!isBox1 && "hidden"} transition-all ml-44 mt-8 hover:scale-105`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent div's onClick from firing
                  setIsBox1(false);
                }}
              >
              </img>
            </div>
          </div>
        </div>

        <div
          className="w-120 colordiv mt-160 -ml-7"
          style={{
            backgroundImage: `url('/imgs/colordivs/${packColor}.PNG')`,
          }}
        >
          {/* <img src="/imgs/colordiv.PNG" className="mx-auto"></img> */}
          {/* <img src="/imgs/colors/green.PNG"></img> */}
          <div className="h-full my-auto mx-auto w-fit flex gap-5">
            <button
              onClick={() => {
                setPackColor("red");
                setPackScale(true);
              }}
              className="w-12 h-12 my-auto hover:bg-[#d45b65] bg-[#d4685b] rounded-full transition-all border-6 border-[#51160d] hover:scale-105"
            ></button>
            <button
              onClick={() => {
                setPackColor("yellow");
                setPackScale(true);
              }}
              className="w-12 h-12 my-auto hover:bg-[#deb75e] bg-[#dec95e] rounded-full transition-all border-6 border-[#51450d] hover:scale-105"
            ></button>
            <button
              onClick={() => {
                setPackColor("green");
                setPackScale(true);
              }}
              className="w-12 h-12 my-auto hover:bg-[#9bbf6c] hover:border-[#0d5114] bg-[#5dac65] rounded-full transition-all border-6 border-[#0d5114] hover:scale-105"
            ></button>
            <button
              onClick={() => {
                setPackColor("blue");
                setPackScale(true);
              }}
              className="w-12 h-12 my-auto hover:bg-[#5bb0d2] bg-[#639ec9] rounded-full transition-all border-6 border-[#0d3451] hover:scale-105"
            ></button>
            <button
              onClick={() => {
                setPackColor("purple");
                setPackScale(true);
              }}
              className="w-12 h-12 my-auto hover:bg-[#c96baf] bg-[#af6dbd] rounded-full transition-all border-6 border-[#470d53] hover:scale-105"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
