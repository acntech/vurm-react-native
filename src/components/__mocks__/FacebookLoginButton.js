import { FacebookSocialButton } from "react-native-social-buttons";
import { auth } from "../../firebase/auth";
const FacebookLoginButton = ({
  buttonViewStyle,
  setUser,
  setDisabled,
  disabled,
}) => {
  const handlePress = () => {
    setUser({ uid: "testUid", displayName: "Test Person" });
  };
  return (
    <FacebookSocialButton
      buttonViewStyle={buttonViewStyle}
      onPress={handlePress}
      disabled={disabled}
    />
  );
};

export default FacebookLoginButton;
