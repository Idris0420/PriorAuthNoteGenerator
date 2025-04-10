import React, { useRef, useState } from "react";
import "./Dashboard.css";

const templates = {
  "!app": "OP at Hospital // insurance with eff date: date elig as per portal // DOS: DOS // MRI part // CPT: CPT Dx: Dx // PA req as per portal // PA approved via portal valid through start - end // auth #num // pc #num ",
  "!den": "OP at Hospital // insurance with eff date: date elig as per portal // DOS: DOS // MRI part // CPT: CPT Dx: Dx // PA req as per portal // PA denied as per portal with case #num // denial reson: reason // pc #num ",
  "!def": "OP at Hospital // insurance with eff date: date elig as per portal // DOS: DOS // MRI part // CPT: CPT Dx: Dx // PA req?",
  "!narcall": "OP at Hospital // insurance with eff date: date elig as per portal // DOS: DOS // MRI part // CPT: CPT Dx: Dx // called #, no PA req as per rep? // callref #num ",
  "!narportal": "OP at Hospital // insurance with eff date: date elig as per portal // DOS: DOS // MRI part // CPT: CPT Dx: Dx // no PA req as per portal? // pc # ",
};

export default function Dashboard() {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const textarea = textareaRef.current;
    const scrollTop = textarea.scrollTop; // 👈 save scroll position
    const cursorPosition = textarea.selectionStart;
    let value = e.target.value;
  
    const textBeforeCursor = value.slice(0, cursorPosition);
    const textAfterCursor = value.slice(cursorPosition);
  
    const match = Object.keys(templates).find((key) =>
      textBeforeCursor.includes(key)
    );
  
    if (match) {
      const triggerIndex = textBeforeCursor.lastIndexOf(match);
      const before = textBeforeCursor.slice(0, triggerIndex);
      const after = textBeforeCursor.slice(triggerIndex + match.length);
  
      const newValue = before + templates[match] + after + textAfterCursor;
      const newCursorPos = before.length + templates[match].length;
  
      setText(newValue);
  
      setTimeout(() => {
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.scrollTop = scrollTop; // 👈 restore scroll
      }, 0);
    } else {
      setText(value);
    }
  };
  

  return (
    <div className="dashboard">
      <textarea
        ref={textareaRef}
        className="text-input"
        value={text}
        onChange={handleChange}
        placeholder="Type here... (e.g., !app)"
      />
    </div>
  );
}
