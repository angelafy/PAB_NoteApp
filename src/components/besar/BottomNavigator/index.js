import TabItem from "../TabItem";
import { Box } from "@gluestack-ui/themed";

const BottomNavigator = ({ state, descriptors, navigation }) => {
  return (
    <Box
      position="absolute"
      left={"$3"}
      right={"$3"}
      bottom={"$3"}
      paddingVertical={"$3"}
      paddingHorizontal={"$5"}
      flexDirection="row"
      backgroundColor="$blue600"
      hardShadow="5"
      borderRadius={"$2xl"}
      justifyContent="space-around"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            label={label}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </Box>
  );
};

export default BottomNavigator;