let rainbowTimer = null;
let lastOperatorColor = "";
let operatorTimer = null;
let activeOperator = null;
let currentSkin = "normal";
let currentOperator = "";
let firstNumber = null;
let justEjaculated = false;



function setOperator(op) {
  const display = document.getElementById("message-display");

  firstNumber = parseFloat(display.textContent);
  currentOperator = op;
  justCalculated = false;

  display.textContent = "0";
}




function calculate() {
  const display = document.getElementById("message-display");
  const secondNumber = parseFloat(display.textContent);

  if (firstNumber === null || currentOperator === "") {
    resetOperator();
    return;
  }

  let total;

  if (currentOperator === "+") {
    total = firstNumber + secondNumber;
  }
  else if (currentOperator === "-") {
    total = firstNumber - secondNumber;
  }
  else if (currentOperator === "*") {
    total = firstNumber * secondNumber;
  }
  else if (currentOperator === "/") {
    total = secondNumber === 0 ? "Error" : firstNumber / secondNumber;
  }

  display.textContent = total;

  firstNumber = null;
  currentOperator = "";
  justCalculated = true;


  resetOperator();
}



function showMessage(number) {
  const display = document.getElementById("message-display");

  resetOperator();

  if (justCalculated) {
    display.textContent = "0";
    justCalculated = false;
  }

  if (number === ".") {
    if (!display.textContent.includes(".")) {
      display.textContent += ".";
    }
    return;
  }

  if (number === "%") {
    const value = parseFloat(display.textContent);

    if (!isNaN(value)) {
      display.textContent = value / 100;
    }
    return;
  }

  if (display.textContent === "0" || display.textContent === "Error") {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}



function clearDisplay() {
  resetOperator();

  currentOperator = "";
  firstNumber = null;
  justCalculated = false;

  document.getElementById("message-display").textContent = "0";
}



function backspace() {
  resetOperator();

  const display = document.getElementById("message-display");

  if (justCalculated) {
    display.textContent = "0";
    justCalculated = false;
    return;
  }

  const chars = Array.from(display.textContent);
  chars.pop();

  display.textContent = chars.length > 0 ? chars.join("") : "0";
}



function resetOperator() {
    clearInterval(operatorTimer);

    if (activeOperator) {
        activeOperator.style.transform = "scale(1)";
        activeOperator.style.zIndex = "1";
        activeOperator = null;
    }
}



function blueSkin() {
  clearInterval(rainbowTimer);
  normalSkin();

  currentSkin = "blue";

  document.getElementById("outline-of-the-calculator").style.background = "blue";
  document.getElementById("display-box").style.backgroundColor = "white";

  const buttons = document.querySelectorAll(
    '.numberkey, button[id="."], button[id="%"], button[id="+"], button[id="-"], button[id="*"], button[id="/"]'
  );

  buttons.forEach(function(button) {
    button.style.backgroundColor = "blue";
    button.style.color = "white";
  });
}



function rainbowSkin() {
  normalSkin();

  currentSkin = "rainbow";

  const colors = [
    "red", "orange", "yellow",
    "green", "blue", "indigo", "violet"
  ];

  const buttons = document.querySelectorAll(
    '.numberkey, button[id="."], button[id="%"], button[id="+"], button[id="-"], button[id="*"], button[id="/"]'
  );

  document.getElementById("outline-of-the-calculator").style.background =
    "linear-gradient(to bottom, #FF0000, #FF7F00, #FFFF00, #008000, #0000FF, #4B0082, #9400D3)";

  document.getElementById("display-box").style.backgroundColor = "white";

  let index = 0;

  rainbowTimer = setInterval(function() {
    if (currentSkin !== "rainbow") {
      clearInterval(rainbowTimer);
      return;
    }

    buttons.forEach(function(button, i) {
      const bg = colors[(i + index) % colors.length];

      button.style.backgroundColor = bg;
      button.style.color =
        (bg === "yellow" || bg === "orange") ? "black" : "white";
    });

    index++;
  }, 100);
}



function oppositeSkin() {
  normalSkin();

  currentSkin = "opposite";

  document.body.style.backgroundColor = "black";

  document.getElementById("outline-of-the-calculator").style.background = "#1a1a1a";
  document.getElementById("outline-of-the-calculator").style.outlineColor = "white";

  document.getElementById("display-box").style.backgroundColor = "black";
  document.getElementById("display-box").style.outlineColor = "white";

  document.getElementById("message-display").style.color = "white";

  const buttons = document.querySelectorAll(
    '.numberkey, button[id="."], button[id="%"], button[id="+"], button[id="-"], button[id="*"], button[id="/"]'
  );

  buttons.forEach(function(button) {
    button.style.backgroundColor = "black";
    button.style.color = "white";
    button.style.borderColor = "white";
  });

  document.getElementById("Clear").style.backgroundColor = "cyan";
  document.getElementById("Clear").style.color = "black";

  document.getElementById("back").style.backgroundColor = "#0ab0fd";
  document.getElementById("back").style.color = "black";

  document.getElementById("=").style.backgroundColor = "#fd0abc";
  document.getElementById("=").style.color = "black";
}



function popOperator(btn) {
  resetOperator();

  activeOperator = btn;

  btn.style.transform = "scale(1.25)";
  btn.style.zIndex = "10";
  btn.style.transition = "transform 0.15s ease";

  if (btn.id !== "=") {

    const colors = [
      "#FF1493",
      "#00CED1",
      "#FFD700",
      "#8A2BE2",
      "#FF4500",
      "#00FA9A",
      "#1E90FF",
      "#FF69B4"
    ];

    operatorTimer = setInterval(function() {

      let randomColor =
        colors[Math.floor(Math.random() * colors.length)];

      while (randomColor === lastOperatorColor) {
        randomColor =
          colors[Math.floor(Math.random() * colors.length)];
      }

      lastOperatorColor = randomColor;

      btn.style.backgroundColor = randomColor;

      btn.style.color =
        (randomColor === "#FFD700" || randomColor === "#00FA9A")
        ? "black"
        : "white";

    }, 0.1);
  }
}



function normalSkin() {
    clearInterval(rainbowTimer);
    clearInterval(operatorTimer);

    activeOperator = null;
    currentSkin = "normal";

    document.body.style.backgroundColor = "";

    document.getElementById("outline-of-the-calculator").style.background = "";
    document.getElementById("outline-of-the-calculator").style.outlineColor = "";

    document.getElementById("display-box").style.backgroundColor = "";
    document.getElementById("display-box").style.outlineColor = "";

    document.getElementById("message-display").style.color = "";

    const buttons = document.querySelectorAll(
        '.numberkey, .others'
    );

    buttons.forEach(function(button) {
        button.style.backgroundColor = "";
        button.style.color = "";
        button.style.borderColor = "";
        button.style.transform = "";
        button.style.zIndex = "";
    });
}
window.onload = function() {
    specialoff();
};

function specialTheme() {
    normalSkin();
    specialon();
}

function specialoff() {
    document.getElementById("img-1").style.top = "-50%";
    document.getElementById("img-2").style.right = "-50%";
    document.getElementById("img-3").style.left = "-50%";
    document.getElementById("img-4").style.bottom = "-50%";
    document.getElementById("top-left").style.opacity = "-50%";
    document.getElementById("top-right").style.opacity = "-50%";
    document.getElementById("bottom-right").style.opacity = "-50%";
    document.getElementById("bottom-left").style.opacity = "-50%";
}

function specialon() {
    document.getElementById("img-1").style.top = "10%";
    document.getElementById("img-2").style.right = "20%";
    document.getElementById("img-3").style.left = "85%";
    document.getElementById("img-4").style.bottom = "30%";
    document.getElementById("top-left").style.opacity = "100%";
    document.getElementById("top-right").style.opacity = "75%";
    document.getElementById("bottom-right").style.opacity = "50%";
    document.getElementById("bottom-left").style.opacity = "25%";
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        showMessage(key);
    }
    else if (key === ".") {
        showMessage(".");
    }
    else if (key === "+") {
        setOperator("+");
    }
    else if (key === "-") {
        setOperator("-");
    }
    else if (key === "*") {
        setOperator("*");
    }
    else if (key === "/") {
        event.preventDefault();
        setOperator("/");
    }
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }
    else if (key === "Backspace") {
        backspace();
    }
    else if (key === "Escape") {
        clearDisplay();
    }
    else if (key === "%") {
        showMessage("%");
    }
});
