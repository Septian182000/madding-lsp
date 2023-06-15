import { InputGroup, FormControl } from "react-bootstrap";
import React from "react";

export const SearchTextField = ({
  width,
  placeholder,
  icon,
  text,
  search,
  setSearch,
  setGetSearch,
  onPageSetting,
}) => {
  return (
    <InputGroup
      style={{
        height: 46,
        borderRadius: 6,
        width: width,
      }}
    >
      <InputGroup.Text
        style={{
          backgroundColor: "#3F483B",
          borderColor: "rgba(65, 65, 80, 1)",
        }}
      >
        <img src={icon} alt={text} />
      </InputGroup.Text>
      <FormControl
        placeholder={placeholder}
        aria-label="time"
        style={{
          color: "black",
          fontFamily: "Rubik",
          fontWeight: 600,
          border: "2px solid rgba(65, 65, 80, 1)",
          backgroundColor: "transparent",
        }}
        onChange={(e) => {
          if (e.target.value === "") {
            setGetSearch("");
          }
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setGetSearch(search);
            onPageSetting();
          }
        }}
        value={search}
      />
    </InputGroup>
  );
};
