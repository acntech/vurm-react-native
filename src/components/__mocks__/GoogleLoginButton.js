import { GoogleSocialButton } from "react-native-social-buttons";
import { auth } from "../../firebase/auth";
const GoogleLoginButton = ({
  buttonViewStyle,
  setUser,
  setDisabled,
  disabled,
}) => {
  const handlePress = () => {
    setUser({ uid: "testUid", displayName: "Test Person" });
  };
  return (
    <GoogleSocialButton
      buttonViewStyle={buttonViewStyle}
      onPress={handlePress}
      disabled={disabled}
    />
  );
};

export default GoogleLoginButton;
