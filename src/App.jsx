import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [packColor, setPackColor] = useState("blue");
  const [packScale, setPackScale] = useState(false);

  const [isBox1, setIsBox1] = useState(false);
  const [isBoxZoom1, setIsBoxZoom1] = useState(false);
  const [isBoxHover1, setIsBoxHover1] = useState(false);
  const [bodyPartActive, setBoxPartActive] = useState("skin");

  const [isBox2, setIsBox2] = useState(false);
  const [isBoxHover2, setIsBoxHover2] = useState(false);

  const [isBox3, setIsBox3] = useState(false);
  const [isBoxHover3, setIsBoxHover3] = useState(false);

  const [isBox4, setIsBox4] = useState(false);
  const [isBoxHover4, setIsBoxHover4] = useState(false);

  const [skin, setSkin] = useState(1);
  const [hair, setHair] = useState(1);
  const [eyes, setEyes] = useState(1);
  const [top, setTop] = useState(1);
  const [bottom, setBottom] = useState(1);
  

  const hairbNumbers = [6, 7, 8];
  const partsLimit = {skin:6, hair:8, eyes:2, top:5, bottom:4}

  function onClose(e, setIsBox, setIsBoxZoom) {
    e.stopPropagation();
    setIsBox(false);
    setIsBoxZoom(false);
  }

  function onZoom(e, isBoxZoom, setIsBoxZoom) {
    e.stopPropagation();

    if (isBoxZoom) {
      setIsBoxZoom(false);
    } else {
      setIsBoxZoom(true);
    }
  }

  function boxClick(setIsBox, setIsBoxHover) {
    setIsBox(true);
    setIsBoxHover(false);
  }

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
          } ${isBoxZoom1 && "zoom1"} ${isBox2 && "zoom2"} ${
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
              className={`${
                !isBox1 && "pointer"
              } w-60 ml-65 mt-58 h-85 z-10 flex flex-col`}
              onClick={() => boxClick(setIsBox1, setIsBoxHover1)}
              onMouseEnter={() => {
                if (setIsBox1) setIsBoxHover1(true);
              }}
              onMouseLeave={() => {
                if (setIsBox1) setIsBoxHover1(false);
              }}
            >
              <div className="flex">
                <ZoomButton
                  isBox={isBox1}
                  setIsBox={setIsBox1}
                  onClickZoom={
                    isBox1 | isBox2 | isBox3 | isBox4 ? onZoom : boxClick
                  }
                  margin="ml-9 mt-8"
                  isBoxZoom={isBoxZoom1}
                  setIsBoxZoom={setIsBoxZoom1}
                />
                <XButton
                  isBox={isBox1}
                  setIsBox={setIsBox1}
                  onClickX={
                    isBox1 | isBox2 | isBox3 | isBox4 ? onClose : boxClick
                  }
                  margin="ml-31 mt-8"
                  setIsBoxZoom={setIsBoxZoom1}
                />
              </div>
              <div className="flex items-center -mt-5 justify-center w-full pl-5 pr-4">
                <Arrow
                  direction="left"
                  isBox={isBox1}
                  setPart={
                    bodyPartActive === "skin"
                      ? setSkin
                      : bodyPartActive === "hair"
                      ? setHair
                      : bodyPartActive === "eyes"
                      ? setEyes
                      : bodyPartActive === "top"
                      ? setTop
                      : bodyPartActive === "bottom"
                      ? setBottom
                      : ""
                  }
                  part={
                    bodyPartActive === "skin"
                      ? skin
                      : bodyPartActive === "hair"
                      ? hair
                      : bodyPartActive === "eyes"
                      ? eyes
                      : bodyPartActive === "top"
                      ? top
                      : bodyPartActive === "bottom"
                      ? bottom
                      : ""
                  }
                  limit={partsLimit[bodyPartActive]}
                />
                <div
                  className={`flex-1 h-[265px]  *:absolute *:transition-all *:duration-300 ${
                    isBox1 ? "*:w-50 *:-ml-8 " : "*:w-55 *:-ml-10 "
                  }
            }`}
                >
                  <img
                    src={`/imgs/box1/hairf/${hair}.PNG`}
                    className={`z-60 animate__animated animate__faster ${
                      packScale ? "animate__pulse" : ""
                    }`}
                  ></img>
                  <img
                    src={`/imgs/box1/bottom/${bottom}.PNG`}
                    className={`z-50 animate__animated animate__faster ${
                      packScale ? "animate__pulse" : ""
                    }`}
                  ></img>
                  <img
                    src={`/imgs/box1/top/${top}.PNG`}
                    className={`z-40 animate__animated animate__faster ${
                      packScale ? "animate__pulse" : ""
                    }`}
                  ></img>
                  <img
                    src={`/imgs/box1/eyes/${eyes}.PNG`}
                    className={`z-30 animate__animated animate__faster ${
                      packScale ? "animate__pulse" : ""
                    }`}
                  ></img>
                  <img
                    src={`/imgs/box1/head/${skin}.PNG`}
                    className={`z-20 animate__animated animate__faster ${
                      packScale ? "animate__pulse" : ""
                    }`}
                  ></img>
                  <img
                    src={`/imgs/box1/body/${skin}.PNG`}
                    className={`z-10 animate__animated animate__faster ${
                      packScale ? "animate__pulse" : ""
                    }`}
                  ></img>
                  {hairbNumbers.includes(hair) && (
                    <img
                      src={`/imgs/box1/hairb/${hair}.PNG`}
                      className={`z-0 animate__animated animate__faster ${
                        packScale ? "animate__pulse" : ""
                      }`}
                    ></img>
                  )}
                </div>
                <Arrow
                  direction="right"
                  isBox={isBox1}
                  setPart={
                    bodyPartActive === "skin"
                      ? setSkin
                      : bodyPartActive === "hair"
                      ? setHair
                      : bodyPartActive === "eyes"
                      ? setEyes
                      : bodyPartActive === "top"
                      ? setTop
                      : bodyPartActive === "bottom"
                      ? setBottom
                      : ""
                  }
                  part={
                    bodyPartActive === "skin"
                      ? skin
                      : bodyPartActive === "hair"
                      ? hair
                      : bodyPartActive === "eyes"
                      ? eyes
                      : bodyPartActive === "top"
                      ? top
                      : bodyPartActive === "bottom"
                      ? bottom
                      : ""
                  }
                  limit={partsLimit[bodyPartActive]}

                />
              </div>
              <div
                className={` flex mx-auto gap-0.5 ${
                  !isBox1 && "opacity-0"
                } transition-all duration-500`}
              >
                <img
                  className={`size-8 pointer  hover:scale-105 transition-all ${
                    bodyPartActive === "skin" && "-translate-y-0.5"
                  }`}
                  src={`/imgs/box1/parts-${
                    bodyPartActive === "skin" ? "active" : "na"
                  }/${packColor}/skin.PNG`}
                  onClick={() => {
                    setBoxPartActive("skin");
                  }}
                ></img>
                <img
                  className={`size-8 pointer hover:scale-105 transition-all ${
                    bodyPartActive === "hair" && "-translate-y-0.5"
                  }`}
                  src={`/imgs/box1/parts-${
                    bodyPartActive === "hair" ? "active" : "na"
                  }/${packColor}/hair.PNG`}
                  onClick={() => {
                    setBoxPartActive("hair");
                  }}
                ></img>
                <img
                  className={`size-8 pointer hover:scale-105 transition-all ${
                    bodyPartActive === "eyes" && "-translate-y-0.5"
                  }`}
                  src={`/imgs/box1/parts-${
                    bodyPartActive === "eyes" ? "active" : "na"
                  }/${packColor}/eyes.PNG`}
                  onClick={() => {
                    setBoxPartActive("eyes");
                  }}
                ></img>
                <img
                  className={`size-8 pointer hover:scale-105 transition-all ${
                    bodyPartActive === "top" && "-translate-y-0.5"
                  }`}
                  src={`/imgs/box1/parts-${
                    bodyPartActive === "top" ? "active" : "na"
                  }/${packColor}/top.PNG`}
                  onClick={() => {
                    setBoxPartActive("top");
                  }}
                ></img>
                <img
                  className={`size-8 pointer hover:scale-105 transition-all ${
                    bodyPartActive === "bottom" && "-translate-y-0.5"
                  }`}
                  src={`/imgs/box1/parts-${
                    bodyPartActive === "bottom" ? "active" : "na"
                  }/${packColor}/bottom.PNG`}
                  onClick={() => {
                    setBoxPartActive("bottom");
                  }}
                ></img>
              </div>
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
                    e.stopPropagation();
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
                      e.stopPropagation();
                      setIsBox3(false);
                    }}
                  ></img>
                </div>
                <div
                  className={`pointer w-20 ml-5 mt-7 h-19 z-10`}
                  onClick={() => {
                    setIsBox4(true);
                    setIsBoxHover4(false);
                  }}
                  onMouseEnter={() => {
                    if (setIsBox4) setIsBoxHover4(true);
                  }}
                  onMouseLeave={() => {
                    if (setIsBox4) setIsBoxHover4(false);
                  }}
                >
                  <img
                    src="/imgs/x.PNG"
                    className={`w-2.5 ${
                      !isBox4 && "hidden"
                    } transition-all ml-13 mt-3.5 hover:scale-105`}
                    onClick={(e) => {
                      e.stopPropagation();
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
              c1="hover:bg-[#d45b65]"
              c2="bg-[#d4685b]"
              c3="border-[#51160d]"
              color="red"
            />
            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="hover:bg-[#deb75e]"
              c2="bg-[#dec95e]"
              c3="border-[#51450d]"
              color="yellow"
            />
            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="hover:bg-[#9bbf6c]"
              c2="bg-[#5dac65]"
              c3="border-[#0d5114]"
              color="green"
            />

            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="hover:bg-[#5bb0d2]"
              c2="bg-[#639ec9]"
              c3="border-[#0d3451]"
              color="blue"
            />
            <ColorButton
              setPackColor={setPackColor}
              setPackScale={setPackScale}
              c1="hover:bg-[#c96baf]"
              c2="bg-[#af6dbd]"
              c3="border-[#470d53]"
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
      className={`w-12 h-12 my-auto ${c1} ${c2} rounded-full transition-all border-6 ${c3} hover:scale-105`}
    ></button>
  );
}

function ZoomButton({
  isBox,
  setIsBox,
  margin,
  onClickZoom,
  isBoxZoom,
  setIsBoxZoom,
}) {
  return (
    <img
      src={`/imgs/${isBoxZoom ? "unzoom" : "zoom"}.PNG`}
      className={`w-5 z-100 pointer ${
        !isBox && "opacity-0"
      } transition-all ${margin} hover:scale-105`}
      onClick={(e) => onClickZoom(e, isBoxZoom, setIsBoxZoom)}
    />
  );
}

function XButton({ isBox, setIsBox, margin, onClickX, setIsBoxZoom }) {
  return (
    <img
      src="/imgs/x.PNG"
      className={`w-5 z-100 pointer ${
        !isBox && "opacity-0"
      } transition-all ${margin} hover:scale-105`}
      onClick={(e) => onClickX(e, setIsBox, setIsBoxZoom)}
    />
  );
}

function Arrow({ isBox, direction, setPart, part, boxClick, limit}) {
  let operation = 0;
  if ((direction === "right") & (part < limit)) {
    operation = 1;
  } else if ((direction === "left") & (part > 1)) {
    operation = -1;
  }
  return (
    <img
      src="/imgs/left.PNG"
      className={`size-8 pointer transition-all z-100 hover:  ${
        direction === "right" ? "hover:scale-x-[-1] scale-x-[-1] hover:scale-105 " : "hover:scale-y-105"
      } ${!isBox && "opacity-0"}`}
      onClick={() => {
        isBox ? setPart((prev) => prev + operation) : boxClick();
      }}
    ></img>
  );
}

export default App;
