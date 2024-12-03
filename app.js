import { rgbaToHsl, hslToRgba } from "./converter.js";

const container = document.getElementById("container");
const turnMultiCols = document.getElementById("multi-colour");
const turnWhiteLight = document.getElementById("white");
const turnWarmLight = document.getElementById("warm-glow");

const lightCount = 100;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const multiColouredLights = [
  [38, 109, 211, 1],
  [212, 33, 33, 1],
  [0, 143, 71, 1],
  [255, 174, 3, 1],
  [255, 31, 98, 1],
];
const whiteLights = [255, 249, 235, 1];
const warmGlow = [255, 210, 112, 1];

const makeBulb = (parent) => {
  const bulb = document.createElement("div");
  bulb.setAttribute("class", "bulb");
  const horizontalPos = Math.floor(Math.random() * windowWidth) + 10;
  const verticalPos = Math.floor(Math.random() * windowHeight) + 10;
  bulb.style.position = "absolute";
  bulb.style.left = `${horizontalPos}px`;
  bulb.style.bottom = `${verticalPos}px`;
  parent.appendChild(bulb);
};

// make bulbs
for (let i = 0; i <= lightCount; i++) {
  makeBulb(container);
}

// make colour themes
const turnMultiColoured = () => {
  const bulbs = document.getElementsByClassName("bulb");
  for (let i = 0; i < bulbs.length; i += 5) {
    bulbs[i].style.backgroundColor = `rgba(${multiColouredLights[0].join(
      ","
    )})`;
    if (bulbs[i + 1]) {
      bulbs[i + 1].style.backgroundColor = `rgba(${multiColouredLights[1].join(
        ","
      )})`;
    }
    if (bulbs[i + 2]) {
      bulbs[i + 2].style.backgroundColor = `rgba(${multiColouredLights[2].join(
        ","
      )})`;
    }
    if (bulbs[i + 3]) {
      bulbs[i + 3].style.backgroundColor = `rgba(${multiColouredLights[3].join(
        ","
      )})`;
    }
    if (bulbs[i + 4]) {
      bulbs[i + 4].style.backgroundColor = `rgba(${multiColouredLights[4].join(
        ","
      )})`;
    }
  }
};
const turnWarmGlow = () => {
  const bulbs = document.getElementsByClassName("bulb");
  for (let i = 0; i < bulbs.length; i++) {
    bulbs[i].style.backgroundColor = `rgba(${warmGlow.join(",")})`;
  }
};
const turnWhite = () => {
  const bulbs = document.getElementsByClassName("bulb");
  for (let i = 0; i < bulbs.length; i++) {
    bulbs[i].style.backgroundColor = `rgba(${whiteLights.join(",")})`;
  }
};

// make box shadows
const makeGlows = () => {
  const bulbs = document.getElementsByClassName("bulb");
  for (let i = 0; i < bulbs.length; i++) {
    const [red, green, blue] = bulbs[i].style.backgroundColor.match(/\d+/g);
    const [hue, saturation, lightness, a] = rgbaToHsl(red, green, blue);
    const lightnessInc = (percent) => {
      return lightness * (1 + percent);
    };

    const shadowOne = hslToRgba(hue, saturation, lightness, 0.8);
    const shadowTwo = hslToRgba(hue, saturation, lightnessInc(0.2), 0.6);
    const shadowThree = hslToRgba(hue, saturation, lightnessInc(0.4), 0.4);
    const shadowFour = hslToRgba(hue, saturation, lightnessInc(0.6), 0.2);

    const boxShadow = `0 0 10px rgba(${shadowOne.join(",")}),
        0 0 20px rgba(${shadowTwo.join(",")}),
        0 0 40px rgba(${shadowThree.join(",")}),
        0 0 60px rgba(${shadowFour.join(",")})`;
    bulbs[i].style.boxShadow = boxShadow;
  }
};
turnMultiColoured();
makeGlows();
// add events to buttons
turnMultiCols.addEventListener("click", () => {
  turnMultiColoured();
  makeGlows();
});
turnWarmLight.addEventListener("click", () => {
  turnWarmGlow();
  makeGlows();
});
turnWhiteLight.addEventListener("click", () => {
  turnWhite();
  makeGlows();
});
