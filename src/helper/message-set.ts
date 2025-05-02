type SetMessageType = React.Dispatch<
  React.SetStateAction<{
    error: boolean;
    message: string;
  }>
>;
const setMessageState = (
  res: any,
  setMessage: SetMessageType,
  reset?: () => void
) => {
  if (!res) return;

  if (res.error) {
    setMessage({ error: true, message: res.error });
  } else {
    setMessage({ error: false, message: res.message });
    reset && reset();
  }
};

export default setMessageState;
