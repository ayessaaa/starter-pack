import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import axios from "axios";

function App() {
  const [packColor, setPackColor] = useState("blue");
  const [packScale, setPackScale] = useState(false);

  const [isBox1, setIsBox1] = useState(false);
  const [isBoxZoom1, setIsBoxZoom1] = useState(false);
  const [isBoxHover1, setIsBoxHover1] = useState(false);
  const [bodyPartActive, setBoxPartActive] = useState("skin");

  const [isBox2, setIsBox2] = useState(false);
  const [isBoxZoom2, setIsBoxZoom2] = useState(false);
  const [isBoxHover2, setIsBoxHover2] = useState(false);
  const [box2, setBox2] = useState(1);

  const [isBox3, setIsBox3] = useState(false);
  const [isBoxZoom3, setIsBoxZoom3] = useState(false);
  const [isBoxHover3, setIsBoxHover3] = useState(false);
  const [box3, setBox3] = useState(1);

  const [isBox4, setIsBox4] = useState(false);
  const [isBoxZoom4, setIsBoxZoom4] = useState(false);
  const [isBoxHover4, setIsBoxHover4] = useState(false);
  const [box4, setBox4] = useState(1);

  const [skin, setSkin] = useState(1);
  const [hair, setHair] = useState(1);
  const [eyes, setEyes] = useState(1);
  const [top, setTop] = useState(1);
  const [bottom, setBottom] = useState(1);

  const [isMusicActive, setIsMusicActive] = useState(false);

  const characterRef = useRef(null);

  const hairbNumbers = [6, 7, 8];
  const partsLimit = { skin: 6, hair: 8, eyes: 2, top: 9, bottom: 5 };

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/suggestions/`)
      .then((response) => {
        setSuggestions(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const images = [
      "/imgs/colordivs/blue.PNG",
      "/imgs/colordivs/green.PNG",
      "/imgs/colordivs/purple.PNG",
      "/imgs/colordivs/red.PNG",
      "/imgs/colordivs/yellow.PNG",
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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

  function startMusic() {
    const music = document.getElementById("bgmusic");
    music.volume = 0.4;
    if (isMusicActive) {
      music.pause();
      setIsMusicActive(false);
    } else {
      music.play().catch((e) => {
        console.log("Autoplay prevented:", e);
      });
      setIsMusicActive(true);
    }
  }

  const handleSave = async () => {
    if (characterRef.current) {
      const canvas = await html2canvas(characterRef.current);
      const link = document.createElement("a");
      link.download = "my-starter-pack.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPackScale(false);
    }, 500);

    return () => {
      window.clearInterval(timer);
    };
  }, [packColor]);

  return (
    <div>
      <div id="starter-pack">
        <GridBG packColor={packColor} />

        <div className="flex flex-col items-center  transition-all">
          <div
            ref={characterRef}
            className={`w-250 absolute mx-auto mt-5 pb-25 ${
              (isBoxHover1 | isBoxHover2 | isBoxHover3 | isBoxHover4) &
                !isBox1 &
                !isBox2 &
                !isBox3 &
                !isBox4 && "smallZoom"
            } ${isBoxZoom1 && "zoom1"} ${isBoxZoom2 && "zoom2"} ${
              isBoxZoom3 && "zoom3"
            } ${isBoxZoom4 && "zoom4"} pack1`}
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
                onClick={() => {
                  boxClick(setIsBox1, setIsBoxHover1);
                  setIsBox2(false);
                  setIsBoxZoom2(false);
                  setIsBox3(false);
                  setIsBoxZoom3(false);
                  setIsBox4(false);
                  setIsBoxZoom4(false);
                }}
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
                    setIsBox1(false);
                    setIsBoxZoom1(false);
                    setIsBox3(false);
                    setIsBoxZoom3(false);
                    setIsBox4(false);
                    setIsBoxZoom4(false);
                  }}
                  onMouseEnter={() => {
                    if (setIsBox2) setIsBoxHover2(true);
                  }}
                  onMouseLeave={() => {
                    if (setIsBox2) setIsBoxHover2(false);
                  }}
                >
                  <div className="flex">
                    <ZoomButton
                      isBox={isBox2}
                      setIsBox={setIsBox2}
                      onClickZoom={
                        isBox1 | isBox2 | isBox3 | isBox4 ? onZoom : boxClick
                      }
                      margin="ml-5 mt-5"
                      isBoxZoom={isBoxZoom2}
                      setIsBoxZoom={setIsBoxZoom2}
                      w="w-4"
                    />

                    <XButton
                      isBox={isBox2}
                      setIsBox={setIsBox2}
                      onClickX={
                        isBox1 | isBox2 | isBox3 | isBox4 ? onClose : boxClick
                      }
                      margin="ml-23 mt-5"
                      setIsBoxZoom={setIsBoxZoom2}
                      w="w-4"
                    />
                  </div>

                  <div className="flex items-center -mt-3 justify-center w-full pl-2.5 pr-2.5">
                    <Arrow
                      direction="left"
                      isBox={isBox2}
                      setPart={setBox2}
                      part={box2}
                      limit={5}
                      size="size-6"
                    />
                    <div
                      className={`flex-1 h-[90px]  *:absolute *:transition-all *:duration-300 ${
                        isBox2 ? "*:w-25 *:-mt-1 " : "*:w-28 *:-ml-2 *:-mt-4 "
                      }}`}
                    >
                      <img
                        src={`/imgs/box2/${box2}.PNG`}
                        className={`z-60 w animate__animated animate__faster ${
                          packScale ? "animate__pulse" : ""
                        }`}
                      ></img>
                    </div>
                    <Arrow
                      direction="right"
                      isBox={isBox2}
                      setPart={setBox2}
                      part={box2}
                      limit={5}
                      size="size-6"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={`pointer w-20 ml-8 mt-8 h-19 z-10`}
                    onClick={() => {
                      setIsBox3(true);
                      setIsBoxHover3(false);
                      setIsBox1(false);
                      setIsBoxZoom1(false);
                      setIsBox2(false);
                      setIsBoxZoom2(false);
                      setIsBox4(false);
                      setIsBoxZoom4(false);
                    }}
                    onMouseEnter={() => {
                      if (setIsBox3) setIsBoxHover3(true);
                    }}
                    onMouseLeave={() => {
                      if (setIsBox3) setIsBoxHover3(false);
                    }}
                  >
                    <div className="flex">
                      <ZoomButton
                        isBox={isBox3}
                        setIsBox={setIsBox3}
                        onClickZoom={
                          isBox1 | isBox2 | isBox3 | isBox4 ? onZoom : boxClick
                        }
                        margin="ml-4 mt-4"
                        isBoxZoom={isBoxZoom3}
                        setIsBoxZoom={setIsBoxZoom3}
                        w="w-2"
                      />

                      <XButton
                        isBox={isBox3}
                        setIsBox={setIsBox3}
                        onClickX={
                          isBox1 | isBox2 | isBox3 | isBox4 ? onClose : boxClick
                        }
                        margin="ml-7 mt-4"
                        setIsBoxZoom={setIsBoxZoom3}
                        w="w-2"
                      />
                    </div>
                    <div className="flex items-center -mt-2 justify-center w-full pl-2.5 pr-3">
                      <Arrow
                        direction="left"
                        isBox={isBox3}
                        setPart={setBox3}
                        part={box3}
                        limit={4}
                        size="size-3"
                      />
                      <div
                        className={`flex-1 h-[60px]  *:absolute *:transition-all *:duration-300 ${
                          isBox3
                            ? "*:w-11 *:mt-2 *:-ml-1 "
                            : "*:w-14 *:-ml-2.5 *:-mt-0.5 "
                        }}`}
                      >
                        <img
                          src={`/imgs/box3/${box3}.PNG`}
                          className={`z-60 w animate__animated animate__faster ${
                            packScale ? "animate__pulse" : ""
                          }`}
                        ></img>
                      </div>
                      <Arrow
                        direction="right"
                        isBox={isBox3}
                        setPart={setBox3}
                        part={box3}
                        limit={4}
                        size="size-3"
                      />
                    </div>
                  </div>
                  <div
                    className={`pointer w-20 ml-5 mt-7 h-19 z-10`}
                    onClick={() => {
                      setIsBox4(true);
                      setIsBoxHover4(false);
                      setIsBox1(false);
                      setIsBoxZoom1(false);
                      setIsBox3(false);
                      setIsBoxZoom3(false);
                      setIsBox2(false);
                      setIsBoxZoom2(false);
                    }}
                    onMouseEnter={() => {
                      if (setIsBox4) setIsBoxHover4(true);
                    }}
                    onMouseLeave={() => {
                      if (setIsBox4) setIsBoxHover4(false);
                    }}
                  >
                    <div className="flex">
                      <ZoomButton
                        isBox={isBox4}
                        setIsBox={setIsBox4}
                        onClickZoom={
                          isBox1 | isBox2 | isBox3 | isBox4 ? onZoom : boxClick
                        }
                        margin="ml-4 mt-4"
                        isBoxZoom={isBoxZoom4}
                        setIsBoxZoom={setIsBoxZoom4}
                        w="w-2 z-100"
                      />

                      <XButton
                        isBox={isBox4}
                        setIsBox={setIsBox4}
                        onClickX={
                          isBox1 | isBox2 | isBox3 | isBox4 ? onClose : boxClick
                        }
                        margin="ml-7 mt-4"
                        setIsBoxZoom={setIsBoxZoom4}
                        w="w-2 z-100"
                      />
                    </div>

                    <div className="flex items-center -mt-2 justify-center w-full pl-2.5 pr-3">
                      <Arrow
                        direction="left"
                        isBox={isBox4}
                        setPart={setBox4}
                        part={box4}
                        limit={4}
                        size="size-3"
                      />
                      <div
                        className={`flex-1 h-[60px]  *:absolute *:transition-all *:duration-300 ${
                          isBox4
                            ? "*:w-11 *:mt-2 *:-ml-1 "
                            : "*:w-14 *:-ml-2.5 *:-mt-0.5 "
                        }}`}
                      >
                        <img
                          src={`/imgs/box4/${box4}.PNG`}
                          className={`z-60 w animate__animated animate__faster ${
                            packScale ? "animate__pulse" : ""
                          }`}
                        ></img>
                      </div>
                      <Arrow
                        direction="right"
                        isBox={isBox4}
                        setPart={setBox4}
                        part={box4}
                        limit={4}
                        size="size-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-120 colordiv mt-150 -ml-7"
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
          <div className="flex -mt-15">
            <audio
              type="audio/mp3"
              src="/music/bgmusic.mp3"
              loop
              id="bgmusic"
            ></audio>
            <img
              src={`/imgs/music/${isMusicActive ? "active" : "notactive"}.PNG`}
              onClick={startMusic}
              className="h-20 hover:scale-105 transition-all pointer"
            />

            <img
              src={`/imgs/save/${packColor}.PNG`}
              onClick={handleSave}
              className=" h-20 rounded-3xl pointer hover:scale-105 transition-all"
            ></img>
          </div>
        </div>
        <Suggestions color={packColor} suggestions={suggestions} />
      </div>
    </div>
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
  w = "w-5",
}) {
  return (
    <img
      src={`/imgs/${isBoxZoom ? "unzoom" : "zoom"}.PNG`}
      className={`${w} z-100 pointer ${
        !isBox && "opacity-0"
      } transition-all ${margin} hover:scale-105`}
      onClick={(e) => onClickZoom(e, isBoxZoom, setIsBoxZoom)}
    />
  );
}

function XButton({
  isBox,
  setIsBox,
  margin,
  onClickX,
  setIsBoxZoom,
  w = "w-5",
}) {
  return (
    <img
      src="/imgs/x.PNG"
      className={`${w} z-100 pointer ${
        !isBox && "opacity-0"
      } transition-all ${margin} hover:scale-105`}
      onClick={(e) => onClickX(e, setIsBox, setIsBoxZoom)}
    />
  );
}

function Arrow({
  isBox,
  direction,
  setPart,
  part,
  boxClick,
  limit,
  size = "size-8",
  margin,
}) {
  let operation = 0;
  let opacity = "opacity-0";
  if ((direction === "right") & (part < limit)) {
    operation = 1;
    opacity = "opacity-100";
  } else if ((direction === "left") & (part > 1)) {
    operation = -1;
    opacity = "opacity-100";
  }
  return (
    <img
      src="/imgs/left.PNG"
      className={`${size}  ${
        operation === 0 ? "default" : "pointer"
      } transition-all z-100 ${margin} hover:  ${
        direction === "right"
          ? "hover:scale-x-[-1] scale-x-[-1] hover:scale-105 "
          : "hover:scale-y-105"
      } ${!isBox ? "opacity-0" : opacity}`}
      onClick={() => {
        isBox ? setPart((prev) => prev + operation) : boxClick();
      }}
    ></img>
  );
}

function Suggestions({ color, suggestions }) {
  const [isSuggestionsIcon, setIsSuggestionsIcon] = useState(false);
  console.log(suggestions);

  function handleSuggestionsIconClick() {
    setIsSuggestionsIcon((prev) => !prev);
  }
  return (
    <>
      <img
        src={`/imgs/${
          isSuggestionsIcon ? "suggestions_icon_active" : "suggestions_icon"
        }/${color}.PNG`}
        className={` h-20 absolute top-10 right-10 pointer hover:scale-105 transition-all
        `}
        onClick={() => {
          handleSuggestionsIconClick();
        }}
      ></img>
      <div className="absolute top-40 right-10 flex flex-col gap-3">
        {suggestions.map((suggest, index) => (
          <Suggestion
            colorDark="#0d3451"
            colorLight="#639ec9"
            isSuggestion={isSuggestionsIcon}
            author={suggest.author}
            text={suggest.text}
            key={index}
          />
        ))}
        <SuggestionComment
          colorDark="#0d3451"
          colorLight="#639ec9"
          isSuggestion={isSuggestionsIcon}
          bgColor="bg-[#5bb0d2]"
          borderColor="border-[#0d3451]"
        />
      </div>
    </>
  );
}

function Suggestion({ colorDark, colorLight, isSuggestion, author, text }) {
  return (
    <div
      className={`bg-white  w-100 flex px-3 py-2 border-6 border-[${colorDark}] rounded-2xl gap-2 items-center animate__animated ${
        isSuggestion ? "animate__fadeInRight" : "animate__fadeOutRight"
      }`}
    >
      <img className="size-15" src="/imgs/suggestions_img/blue.PNG"></img>
      <div className="flex-1">
        <p className={`font-bold text-[${colorDark}] text-lg`}>{author}</p>
        <p className={`font-medium text-[${colorLight}]`}>{text}</p>
      </div>
      <div className="flex items-center right-0">
        <img
          className="size-12 pointer"
          src="/imgs/suggestions_like/blue.PNG"
        ></img>
        <p className={`font-bold text-lg text-[${colorDark}]`}>1</p>
      </div>
    </div>
  );
}

function SuggestionComment({
  colorDark,
  colorLight,
  isSuggestion,
  bgColor,
  borderColor,
}) {

  const [text, setText] = useState('asd');
  const [author, setAuthor] = useState('asd');
  const [skin, setSkin] = useState('');
  const [hair, setHair] = useState('');
  const [eyes, setEyes] = useState('');
  const [likes, setLikes] = useState('');
  const [time, setTime] = useState(83748385);
  const [loading, setLoading] = useState(false);


  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      text,
      author,
      skin,
      hair,
      eyes,
      likes,
      time
    };
    setLoading(true);
    axios
      .post('http://localhost:5000/suggestions', data)
      .then(() => {
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }

  

  return (
    <div
      className={`${bgColor} ${top} w-100  px-3 pt-3 pb-3 border-6 border-[${colorDark}] rounded-2xl gap-2 items-center animate__animated ${
        isSuggestion ? "animate__fadeInRight" : "animate__fadeOutRight"
      }`}
    >
      <p className={`text-center font-bold text-white text-lg mb-4`}>
        comment your suggestions here!
      </p>
      <div className="flex gap-3">
        <img className="size-15" src="/imgs/suggestions_img/blue.PNG"></img>
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-1"
        >
          <input name="author"
            className={`font-medium text-[${colorLight}] w-35 rounded-lg bg-white px-2  ${borderColor} border-4 focus:outline-0`}
          ></input>
          {/* <p className={`font-bold text-[${colorDark}] text-lg`}>ayessa</p> */}
          <div className="flex gap-2">
            <input name="text"
              className={`font-medium text-[${colorLight}]  rounded-lg flex-1 bg-white px-2 py-1 ${borderColor} border-4 focus:outline-0`}
            ></input>
            <button>
              <img
                className="size-10 pointer"
                src="/imgs/suggestions_send/blue.PNG"
              ></img>
            </button>
          </div>
          {/* <input className={`font-medium text-[${colorLight}]`}>i want more animals</input> */}
        </form>
        <div className="flex items-center right-0"></div>
      </div>
    </div>
  );
}

export default App;
