import ViewerSlideControls from "./ViewerSlideControls";
import ViewerWindowControls from "./ViewerWindowControls";

export default function ViewerControls(props) {
  return (
    <>
      <ViewerWindowControls {...props} />
      <ViewerSlideControls {...props} />
    </>
  );
}
