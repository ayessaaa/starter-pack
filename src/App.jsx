import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [packColor, setPackColor] = useState("blue");
  const [packScale, setPackScale] = useState(false);
  const [isBox1, setIsBox1] = useState(false);
  const [isBoxHover1, setIsBoxHover1] = useState(false);

  const [isBox2, setIsBox2] = useState(false);
  const [isBoxHover2, setIsBoxHover2] = useState(false);

  const [isBox3, setIsBox3] = useState(false);
  const [isBoxHover3, setIsBoxHover3] = useState(false);

  const [isBox4, setIsBox4] = useState(false);
  const [isBoxHover4, setIsBoxHover4] = useState(false);

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
      <GridBG packColor={packColor} />

      <div className="flex flex-col items-center  transition-all">
        <div
          className={`w-250 absolute mx-auto mt-15 ${
            (isBoxHover1 | isBoxHover2 | isBoxHover3 | isBoxHover4) &
              !isBox1 &
              !isBox2 &
              !isBox3 &
              !isBox4 && "smallZoom"
          } ${isBox1 && "zoom1"} ${isBox2 && "zoom2"} ${
            isBox3 && "zoom3"
          } ${isBox4 && "zoom4"} pack1`}
        >
          <img
            src={`/imgs/bgs/${packColor}.PNG`}
            className={`w-250 absolute mx-auto z-0 transition-all pack  animate__animated animate__faster ${
              packScale ? "animate__pulse" : ""
            }`}
          ></img>
          <div className="flex">
            <div
              className={`pointer w-60 ml-65 mt-58 h-85 z-10`}
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
                className={`w-7 ${
                  !isBox1 && "hidden"
                } transition-all ml-44 mt-8 hover:scale-105`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent div's onClick from firing
                  setIsBox1(false);
                }}
              ></img>
            </div>
            <div className="flex flex-col">
              <div
                className={`pointer w-42 ml-8 mt-56 h-32 z-10`}
                onClick={() => {
                  setIsBox2(true);
                  setIsBoxHover2(false);
                }}
                onMouseEnter={() => {
                  if (setIsBox2) setIsBoxHover2(true);
                }}
                onMouseLeave={() => {
                  if (setIsBox2) setIsBoxHover2(false);
                }}
              >
                <img
                  src="/imgs/x.PNG"
                  className={`w-5 ${
                    !isBox2 && "hidden"
                  } transition-all ml-30 mt-5 hover:scale-105`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent div's onClick from firing
                    setIsBox2(false);
                  }}
                ></img>
              </div>
              <div className="flex">
                <div
                  className={`pointer w-20 ml-8 mt-8 h-19 z-10`}
                  onClick={() => {
                    setIsBox3(true);
                    setIsBoxHover3(false);
                  }}
                  onMouseEnter={() => {
                    if (setIsBox3) setIsBoxHover3(true);
                  }}
                  onMouseLeave={() => {
                    if (setIsBox3) setIsBoxHover3(false);
                  }}
                >
                  <img
                    src="/imgs/x.PNG"
                    className={`w-2.5 ${
                      !isBox3 && "hidden"
                    } transition-all ml-13 mt-3.5 hover:scale-105`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent div's onClick from firing
                      setIsBox3(false);
                    }}
                  ></img>
                </div>
                <div className={`pointer w-20 ml-5 mt-7 h-19 z-10`}
                onClick={() => {
                  setIsBox4(true);
                  setIsBoxHover4(false);
                }}
                onMouseEnter={() => {
                  if (setIsBox4) setIsBoxHover4(true);
                }}
                onMouseLeave={() => {
                  if (setIsBox4) setIsBoxHover4(false);
                }}>
                  <img
                    src="/imgs/x.PNG"
                    className={`w-2.5 ${
                      !isBox4 && "hidden"
                    } transition-all ml-13 mt-3.5 hover:scale-105`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent div's onClick from firing
                      setIsBox4(false);
                    }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-120 colordiv mt-160 -ml-7"
          style={{
            backgroundImage: `url('/imgs/colordivs/${packColor}.PNG')`,
          }}
        >
          <div className="h-full my-auto mx-auto w-fit flex gap-5">
            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="#d45b65"
              c2="#d4685b"
              c3="#51160d"
              color="red"
            />
            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="#deb75e"
              c2="#dec95e"
              c3="#51450d"
              color="yellow"
            />
            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="#9bbf6c"
              c2="#5dac65"
              c3="#0d5114"
              color="green"
            />

            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="#5bb0d2"
              c2="#639ec9"
              c3="#0d3451"
              color="blue"
            />
            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="#c96baf"
              c2="#af6dbd"
              c3="#470d53"
              color="purple"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function GridBG({ packColor }) {
  return (
    <div
      className={`absolute inset-0 -z-10 max-h-screen w-full ${packColor}-grid-bg ${packColor}bg transition-all bg-[size:6rem_5rem]`}
    ></div>
  );
}

function ColorButton({ setPackColor, setPackScale, c1, c2, c3, color }) {
  return (
    <button
      onClick={() => {
        setPackColor(color);
        setPackScale(true);
      }}
      className={`w-12 h-12 my-auto hover:bg-[${c1}] bg-[${c2}] rounded-full transition-all border-6 border-[${c3}] hover:scale-105`}
    ></button>
  );
}

export default App;
