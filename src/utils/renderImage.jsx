const renderImage = (blob) => {
  const url = URL.createObjectURL(blob);
  return <img src={url} width={200} />;
};

export default renderImage;
