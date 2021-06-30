import "./LoadingCube.css";
import { useEffect } from "react";
interface LoadingCubeProps {}

const randomHueValue = () => {
  return Math.round(Math.random() * 360);
};
export const LoadingCube: React.FC<LoadingCubeProps> = ({}) => {
  const overwriteCssVariable = () => {
    let root = document.getElementById("root");
    let hueValue = randomHueValue();
    console.log("changed");
    if (root !== null) {
      root.style.setProperty("--hue", `${hueValue}`);
      console.log(hueValue);
    }
  };
  useEffect(() => {
    overwriteCssVariable();
  }, []);
  return (
    <div className="LoadingCube">
      <div className="scene">
        <div className="plane">
          <div className="cube cube--0">
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
          </div>
          <div className="shadow shadow--0" />
          <div className="cube cube--1">
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
          </div>
          <div className="shadow shadow--1" />
          <div className="cube cube--2">
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
          </div>
          <div className="shadow shadow--2" />
          <div className="cube cube--3">
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
          </div>
          <div className="shadow shadow--3" />
          <div className="cube cube--4">
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
          </div>
          <div className="shadow shadow--4" />
          <div className="cube cube--5">
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
          </div>
          <div className="shadow shadow--5" />
          <div className="cube cube--6">
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
          </div>
          <div className="shadow shadow--6" />
          <div className="cube cube--7">
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
            <div className="cube__side" />
          </div>
          <div className="shadow shadow--7" />
        </div>
      </div>
    </div>
  );
};
