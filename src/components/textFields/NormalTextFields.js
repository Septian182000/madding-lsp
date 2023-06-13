import { InputGroup, FormControl } from "react-bootstrap";
import React from "react";

export const NormalTextField = ({
  typed,
  placeholder,
  icon,
  input,
  onChanged,
  onClicked,
  background,
}) => {
  return (
    <InputGroup
      style={{
        height: 46,
        borderRadius: 6,
      }}
    >
      <FormControl
        type={typed}
        placeholder={placeholder}
        value={input}
        onChange={onChanged}
        aria-label="time"
        style={{
          color: "black",
          fontFamily: "Rubik",
          fontWeight: 600,
          border: "1px solid rgba(65, 65, 80, 1)",
          backgroundColor: background ? background : "transparent",
        }}
      />
      {icon ? (
        <InputGroup.Text
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(65, 65, 80, 1)",
            borderLeft: "transparent",
            cursor: "pointer",
          }}
          onClick={onClicked}
        >
          <img src={icon} alt="icon" />
        </InputGroup.Text>
      ) : (
        ""
      )}
    </InputGroup>
  );
};
