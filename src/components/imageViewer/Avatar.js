export const Avatar = ({ picture, size }) => {
  return (
    <img
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.5,
        border: "1px solid black",
        objectFit: "cover",
        backgroundColor: "#D9D9D9",
      }}
      src={picture}
      alt={"avatar"}
    />
  );
};
