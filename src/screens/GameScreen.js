import { useEffect, useState } from "react";
import Game from "../components/Game";
import withLoadingOverlay from "../components/withLoadingOverlay";

const GameWithLoadingOverlay = withLoadingOverlay(Game);

const GameScreen = ({ navigation }) => {
  const [overlayVisible, setOverlayVisible] = useState(true);
  return (
    <GameWithLoadingOverlay
      overlayVisible={overlayVisible}
      navigation={navigation}
      onFinishedLoading={() => {
        setOverlayVisible(false);
      }}
    />
  );
};
export default GameScreen;
