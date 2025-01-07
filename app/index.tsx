import { Redirect } from "expo-router";

const Index = () => {
  return <Redirect href="/(auth)/sign-in" />;

  // return <Redirect href="/(roots)/(tabs)/home" />;
};

export default Index;
