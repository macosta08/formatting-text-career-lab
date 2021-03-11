import "./App.css";
import React from "react";

function App() {
  const [textInput, setTextInput] = React.useState(`This is
a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

This      is a second paragraph with extraneous whitespace.`);
  const [textOutput, setTextOutput] = React.useState("");

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    transformText(textInput);
  };

  const transformText = (input) => {
    const EOP = "<#{EOP}#> ";
    const lineBreak = "\n";
    const doubleLineBreak = "\n\n";
    let charCount = 80;

    const words = input
      .trim()
      .replace(/[.]\n/g, `.${EOP}`)
      .replace(/[!]\n/g, `!${EOP}`)
      .replace(/[?]\n/g, `?${EOP}`)
      .replace(/[ \n]+/g, " ")
      .replace(/<#{EOP}#>+/g, doubleLineBreak)
      .split(" ");

    const reducer = (wordJoin, currentWord) => {
      const updateCharCount = (word) => (charCount = word.length + 80);

      const newWord =
        wordJoin + (wordJoin.endsWith(lineBreak) ? "" : " ") + currentWord;

      if (newWord.endsWith(doubleLineBreak)) updateCharCount(newWord);

      if (newWord.length > charCount) {
        updateCharCount(wordJoin + lineBreak);
        return wordJoin + lineBreak + currentWord;
      } else return newWord;
    };

    setTextOutput(words.reduce(reducer));
  };

  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea onChange={handleChange} value={textInput} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div id="result">{textOutput}</div>
    </div>
  );
}

export default App;
