export const Checkbox = ({ checkHandler, disabled }) => {
  return (
    <>
      <input type="checkbox" onChange={checkHandler} disabled={disabled} />
    </>
  );
};
