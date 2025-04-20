import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img src="/imgs/pack.png" className="w-2/6 mx-auto mt-20"></img>
        
        <div className="w-2/6 colordiv">
        <img src="/imgs/colordiv.PNG" className="mx-auto"></img>
        {/* <img src="/imgs/colors/green.PNG"></img> */}
        <div className="-mt-30 mx-auto w-fit flex gap-3">

        {/* <button className="w-16 h-16 hover:bg-green-700/90 hover:border-green-900 bg-green-600 rounded-full transition-all border-6 border-green-800"> </button>
        <button className="w-16 h-16 hover:bg-purple-700/90 hover:border-purple-900 bg-purple-600 rounded-full transition-all border-6 border-purple-800"> </button> */}
        </div>
        </div>


      </div>
    </>
  );
}

export default App;
