export const Avatar = ({ picture, size }) => {
  return (
    <img
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.5,
        objectFit: "cover",
        backgroundColor: "#D9D9D9",
      }}
      src={picture}
      alt={"avatar"}
    />
  );
};
