import React from "react";
import "./Folder.css";

function darkenColor(hex, percent) {
  const color = hex.replace("#", "");
  const normalized = color.length === 3 ? color.split("").map((char) => char + char).join("") : color;
  const value = Number.parseInt(normalized, 16);
  const channel = (shift) => Math.max(0, Math.floor(((value >> shift) & 255) * (1 - percent)));
  return "#" + [channel(16), channel(8), channel(0)].map((part) => part.toString(16).padStart(2, "0")).join("");
}

export default function Folder({ color, open }) {
  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": darkenColor(color, 0.14),
  };

  return (
    <span className={"archiveFolder" + (open ? " isOpen" : "")} style={folderStyle} aria-hidden="true">
      <span className="archiveFolderBack">
        {[0, 1, 2].map((index) => (
          <span className={"archivePaper archivePaper" + (index + 1)} key={index} />
        ))}
        <span className="archiveFolderFront" />
      </span>
    </span>
  );
}
