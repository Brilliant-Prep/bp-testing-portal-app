import React, { useState } from "react";


const initialOptions = [
  { index: "A", text: "substantial", incorrect: false },
  { index: "B", text: "satisfying", incorrect: false },
  { index: "C", text: "unimportant", incorrect: false },
  { index: "D", text: "appropriate", incorrect: false },
];

const ItemsPerPage = 5;

const Home = () => {
  
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const [options, setOptions] = useState(initialOptions);
  const [correctText, setCorrectText] = useState("");
  const [selectedText, setSelectedText] = useState();
  const [note, setNote] = useState("");
  const [color, setColor] = useState("yellow");
  const [correctOptionIndex, setCorrectOptionindex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAnnotationBox, setShowAnnotationBox] = useState(false);
  const [textUnderline, setTextUnderline] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  // <{ text: string; color: string; note: string }[]>

  // ------ Not using
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  // -------

  const correctOptionHandler = (index) => {
    setCorrectText(options[index].text);

    const updatedArr = [...options];

    updatedArr[index].incorrect = false;
    setOptions(updatedArr);

    setCorrectOptionindex(index);
  };

  const incorrectOptionHandler = (index) => {
    const updatedArr = [...options];

    updatedArr[index].incorrect = !updatedArr[index].incorrect;
    setOptions(updatedArr);

    if (correctText === options[index].text) {
      setCorrectText("");
    }
  };

  const annotateHandler = () => {
    const selection = window.getSelection();
    const id = uuid();

    if (selection?.toString()) {
      console.log("selection", selection);

      setAnnotations([...annotations, { id, text: selection.toString(), color }]);
      setSelectedText(selection.toString());

      setShowAnnotationBox(true);

      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.style.textDecoration = textUnderline ? "underline" : "";
      span.className = "highlighted-text";
      // span.id = "text";
      span.id = id;
      span.textContent = selectedText;
      selection.getRangeAt(0).surroundContents(span);
    }
    selection?.removeAllRanges();
  };

  const annotationSaveHandler = () => {
    console.log("color, note ", color, note);

    const id = annotations[annotations.length - 1].id;
    const text = annotations[annotations.length - 1].text;
    console.log("id, text", id, text);

    if (selectedText) {
      const span = document.getElementById(id);
      console.log("span", span);

      span?.addEventListener("mouseenter", () => {
        const tooltip = document.createElement("span");
        tooltip.className = "highlighted-tooltip";
        tooltip.textContent = note;
        span.appendChild(tooltip);
      });

      span?.addEventListener("mouseleave", () => {
        const tooltip = span.querySelector(".highlighted-tooltip");
        if (tooltip) {
          span.removeChild(tooltip);
        }
      });

      setNote("");
    }

    // setShowAnnotationBox(false);
  };

  const uuid = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortUUID = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUUID += characters.charAt(randomIndex);
    }
    return shortUUID;
  };

  const formatSelection = (inputString) => {
    const words = inputString.split(" ");

    if (words.length <= 10) {
      return inputString;
    } else {
      const firstFiveWords = words.slice(0, 5).join(" ");
      const lastFiveWords = words.slice(-5).join(" ");
      return `"${firstFiveWords} ... ${lastFiveWords}"`;
    }
  };

  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  const currentTodos = options.slice(startIndex, endIndex);

  return (
    <div className="h-screen">
      <div className="font-semibold px-10 flex items-center justify-between bg-slate-50">
        <h1>Section 1, Module 1: Reading and Writing</h1>
        <div>
          <button onClick={annotateHandler} className="">
            Annotate
          </button>
        </div>
      </div>
      <div className="grid gap-20 md:grid-cols-2 px-10 mt-4">
        <div className="md:border-r-[2px] border-gray-400 md:pr-20">
          <p className="text-justify">
            Lorem ipsum ________ sit amet consectetur adipisicing elit. Provident asperiores
            deserunt aut laboriosam laborum exercitationem corporis. Sequi ducimus iure officia
            nihil sed ab sapiente exercitationem expedita praesentium odio officiis nobis delectus,
            commodi, tenetur debitis unde alias mollitia? Ipsum minima cupiditate quas vitae, unde
            nemo neque aut corrupti porro iure doloremque.
          </p>
        </div>

        <div className="">
          <div className="bg-black text-white px-2 mb-3 inline-block">{currentPage}</div>
          <h1>Which choice completes the text.</h1>
          <h1>
            Correct text is <span className="text-blue-600">{correctText}</span>
          </h1>
          <div>
            {options.map((option, index) => (
              <div key={index} className="flex items-center justify-center my-4">
                <div
                  onClick={() => correctOptionHandler(index)}
                  className={`flex border w-full rounded-lg px-5 py-2 cursor-pointer ${
                    index == correctOptionIndex && !option.incorrect
                      ? "border-blue-600 border-2"
                      : "border-gray-400"
                  } ${option.incorrect && "incorrect-option text-gray-400"}`}
                >
                  <div
                    className={`rounded-full h-[30px] w-[30px] border border-gray-400 flex items-center justify-center mr-5 ${
                      correctOptionIndex === index &&
                      !option.incorrect &&
                      "border-blue-600 bg-blue-600 text-white"
                    } ${option.incorrect && "text-gray-400 border-gray-300"}`}
                  >
                    {option.index}
                  </div>
                  <div>{option.text}</div>
                </div>
                <div
                  onClick={() => incorrectOptionHandler(index)}
                  className="incorrect-btn cursor-pointer rounded-full h-[20px] w-[20px] text-xs border border-gray-400 flex items-center justify-center ml-4"
                >
                  {option.index}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between fixed bottom-0 w-full px-10 bg-slate-50">
        <div className="font-semibold">{first_name} {last_name}</div>

        <div className="bg-gray-950 px-3 py-2 text-white rounded text-sm">Question 3 of 27</div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-blue-700 hover:bg-blue-600 rounded-3xl px-4 py-2 cursor-pointer text-white text-sm"
          >
            Back
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(options.length / ItemsPerPage)}
            className="bg-blue-700 hover:bg-blue-600 rounded-3xl px-4 py-2 cursor-pointer text-white text-sm"
          >
            Next
          </button>
        </div>
      </div>

      {showAnnotationBox && (
        <div className="w-full h-[40%] fixed bottom-0 bg-gray-200">
          <div className="flex justify-between bg-gray-900 text-white px-16 py-3">
            <h1>
              New Annotation:
              <span className="ml-2 text-gray-300 text-sm">{formatSelection(selectedText)}</span>
            </h1>
            <div>
              <button onClick={() => setShowAnnotationBox(false)}>Close X</button>
            </div>
          </div>
          <div className="px-16 my-5">
            <div className="flex items-center space-x-5 mb-3">
              <div className="space-x-3 flex items-center justify-center">
                <label htmlFor="colorPicker">Highlight Color:</label>
                <input
                  type="color"
                  id="colorPicker"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ backgroundColor: color }}
                  className="rounded-full w-0 h-0 outline-none border-[1px] border-gray-800 p-3"
                />
              </div>
              <div className="space-x-3 flex items-center justify-center">
                <div>Underline Style:</div>
                <button
                  onClick={() => setTextUnderline(!textUnderline)}
                  className={`underline border-[1px] border-gray-800 px-1 ${
                    textUnderline && "border-[2px] font-bold"
                  }`}
                >
                  U
                </button>
              </div>
            </div>
            <div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-[60%] h-[100px] resize-none rounded border-[1px] border-gray-400 focus-within:border-gray-600 outline-none p-3"
              />

              <div className="mt-2 space-x-2">
                <button
                  onClick={annotationSaveHandler}
                  className="rounded-3xl px-4 py-2 text-sm text-white bg-blue-700 hover:bg-blue-600"
                >
                  Save
                </button>
                <button className="rounded-3xl px-4 py-2 text-sm hover:bg-gray-300">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
