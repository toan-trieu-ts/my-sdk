const Section = ({ title, children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "fit-content",
      }}
    >
      <h2 style={{ marginBlockEnd: 0 }}>{title}</h2>
      {children}
    </div>
  );
};

export default Section;
