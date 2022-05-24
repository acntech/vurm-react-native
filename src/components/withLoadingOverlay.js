import { Modal, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView, View } from "react-native";

export default withLoadingOverlay = (ComponentToWrap) => (props) => {
  overlayVisible = props?.overlayVisible ? props.overlayVisible : false;

  return (
    <SafeAreaView>
      <Modal visible={overlayVisible} animationType={"none"} transparent={true}>
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
      <ComponentToWrap {...props}></ComponentToWrap>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
});
