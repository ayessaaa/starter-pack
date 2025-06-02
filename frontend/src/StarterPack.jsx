import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const colors = {
  red1: "#51160d",
  red2: "#d45b65",
  yellow1: "#51450d",
  yellow2: "#deb75e",
  green1: "#0d5114",
  green2: "#9bbf6c",
  blue1: "#0d3451",
  blue2: "#5bb0d2",
  purple1: "#470d53",
  purple2: "#c96baf",
};

function StarterPack() {
  const { id } = useParams();
  console.log(id);
  const [packColor, setPackColor] = useState("blue");
  const [packScale, setPackScale] = useState(false);

  const [isBox1, setIsBox1] = useState(false);
  const [bodyPartActive, setBodyPartActive] = useState("skin");

  const [isBox2, setIsBox2] = useState(false);
  const [box2, setBox2] = useState(1);

  const [isBox3, setIsBox3] = useState(false);
  const [box3, setBox3] = useState(1);

  const [isBox4, setIsBox4] = useState(false);
  const [box4, setBox4] = useState(1);

  const [skin, setSkin] = useState(1);
  const [hair, setHair] = useState(1);
  const [eyes, setEyes] = useState(1);
  const [top, setTop] = useState(1);
  const [bottom, setBottom] = useState(1);
  const [shoes, setShoes] = useState(1);


  const characterRef = useRef(null);

  const hairbNumbers = [6, 7, 8];
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/starter-pack/${id}`)
      .then((response) => {
        setName(response.data.name);
        setHair(response.data.hair);
        setSkin(response.data.skin);
        setEyes(response.data.eyes);
        setTop(response.data.top);
        setBottom(response.data.bottom);
        setShoes(response.data.shoes);
        setBox2(response.data.box2);
        setBox3(response.data.box3);
        setBox4(response.data.box4);
        setPackColor(response.data.color)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
      <div id="starter-pack" ref={characterRef}>
        <GridBG packColor={packColor} />

        <div className="flex flex-col items-center  transition-all ">
          <div
            
            className={`w-250  mx-auto mt-23 pb-25 mb-20  pack1`}
          >
            <img
              src={`/imgs/bgs/${packColor}1.PNG`}
              className={`w-250 absolute mx-auto z-0 transition-all pack  `}
            ></img>
            <div className="flex">
              <div
                className={`${
                  !isBox1 && ""
                } w-60 ml-65 mt-58 h-85 z-10 flex flex-col`}
              >
                <div className="flex"></div>
                <div className="flex items-center mt-8 justify-center w-full pl-13 pr-4">
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
                    {hairbNumbers.includes(Number(hair)) && (
                      <img
                        src={`/imgs/box1/hairb/${hair}.PNG`}
                        className={`z-0 animate__animated animate__faster ${
                          packScale ? "animate__pulse" : ""
                        }`}
                      ></img>
                    )}
                    <img
                      src={`/imgs/box1/shoes/${shoes}.PNG`}
                      className={`z-60 animate__animated animate__faster ${
                        packScale ? "animate__pulse" : ""
                      }`}
                    ></img>
                  </div>
                </div>
                <div
                  className={` flex mx-auto gap-0.5 ${
                    !isBox1 && "opacity-0"
                  } transition-all duration-500`}
                >
                  <img
                    className={`ml-2 size-7.5   hover:scale-105 transition-all ${
                      bodyPartActive === "skin" && "-translate-y-0.5"
                    }`}
                    src={`/imgs/box1/parts-${
                      bodyPartActive === "skin" ? "active" : "na"
                    }/${packColor}/skin.PNG`}
                    onClick={() => {
                      setBodyPartActive("skin");
                    }}
                  ></img>
                  <img
                    className={`size-7.5  hover:scale-105 transition-all ${
                      bodyPartActive === "hair" && "-translate-y-0.5"
                    }`}
                    src={`/imgs/box1/parts-${
                      bodyPartActive === "hair" ? "active" : "na"
                    }/${packColor}/hair.PNG`}
                    onClick={() => {
                      setBodyPartActive("hair");
                    }}
                  ></img>
                  <img
                    className={`size-7.5  hover:scale-105 transition-all ${
                      bodyPartActive === "eyes" && "-translate-y-0.5"
                    }`}
                    src={`/imgs/box1/parts-${
                      bodyPartActive === "eyes" ? "active" : "na"
                    }/${packColor}/eyes.PNG`}
                    onClick={() => {
                      setBodyPartActive("eyes");
                    }}
                  ></img>
                  <img
                    className={`size-7.5  hover:scale-105 transition-all ${
                      bodyPartActive === "top" && "-translate-y-0.5"
                    }`}
                    src={`/imgs/box1/parts-${
                      bodyPartActive === "top" ? "active" : "na"
                    }/${packColor}/top.PNG`}
                    onClick={() => {
                      setBodyPartActive("top");
                    }}
                  ></img>
                  <img
                    className={`size-7.5  hover:scale-105 transition-all ${
                      bodyPartActive === "bottom" && "-translate-y-0.5"
                    }`}
                    src={`/imgs/box1/parts-${
                      bodyPartActive === "bottom" ? "active" : "na"
                    }/${packColor}/bottom.PNG`}
                    onClick={() => {
                      setBodyPartActive("bottom");
                    }}
                  ></img>
                  <img
                    className={`size-7.5  hover:scale-105 transition-all ${
                      bodyPartActive === "shoes" && "-translate-y-0.5"
                    }`}
                    src={`/imgs/box1/parts-${
                      bodyPartActive === "shoes" ? "active" : "na"
                    }/${packColor}/shoes.PNG`}
                    onClick={() => {
                      setBodyPartActive("shoes");
                    }}
                  ></img>
                </div>
              </div>
              <div className="flex flex-col">
                <div
                  className={` w-42 ml-14 mt-66 h-32 z-10`}
                  onMouseEnter={() => {
                    if (setIsBox2) setIsBoxHover2(true);
                  }}
                  onMouseLeave={() => {
                    if (setIsBox2) setIsBoxHover2(false);
                  }}
                >
                  <div className="flex"></div>

                  <div className="flex items-center -mt-3 justify-center w-full pl-2.5 pr-2.5">
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
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={` w-20 ml-11 mt-4 h-19 z-10`}
                    onMouseEnter={() => {
                      if (setIsBox3) setIsBoxHover3(true);
                    }}
                    onMouseLeave={() => {
                      if (setIsBox3) setIsBoxHover3(false);
                    }}
                  >
                    <div className="flex"></div>
                    <div className="flex items-center -mt-2 justify-center w-full pl-2.5 pr-3">
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
                    </div>
                  </div>
                  <div
                    className={` w-20 ml-5 mt-3 h-19 z-10`}
                    onMouseEnter={() => {
                      if (setIsBox4) setIsBoxHover4(true);
                    }}
                    onMouseLeave={() => {
                      if (setIsBox4) setIsBoxHover4(false);
                    }}
                  >
                    <div className="flex"></div>

                    <div className="flex items-center -mt-2 justify-center w-full pl-2.5 pr-3">
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
                    </div>
                  </div>
                </div>
                <NameTag packColor={packColor} name={name} setName={setName} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={`/imgs/save/${packColor}.PNG`}
        onClick={handleSave}
        className={`h-18 rounded-3xl pointer -mt-20 hover:scale-105 transition-all mx-auto`}
      ></img>
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

function NameTag({ packColor, name }) {
  return (
    <>
      <img
        className={`h-12.5  z-50 mt-13 mx-auto transition-all ${
          name.length >= 10
            ? "w-46 ml-9"
            : name.length >= 8
            ? "w-38 ml-12"
            : "w-30 ml-16"
        }`}
        src={`/imgs/nametag/${packColor}.PNG`}
      ></img>
      <span
        className={`ml-16 z-60 text-2xl w-30 text-center -mt-9.5 ${
          packColor === "red"
            ? "text-[#51160d]"
            : packColor === "yellow"
            ? "text-[#51450d]"
            : packColor === "green"
            ? "text-[#0d5114]"
            : packColor === "blue"
            ? "text-[#0d3451]"
            : "text-[#470d53]"
        }`}
      >
        {name}
      </span>
    </>
  );
}

export default StarterPack;
