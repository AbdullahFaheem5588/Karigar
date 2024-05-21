  import React from 'react';
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  import CompleteTab from './CompleteTab';
  import OngoingTab from './OngoingTab';
  import AllTab from './AllTab';
  import color from '../../Assets/colors/colors';
  import { yellow100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

  // const Complete = () => <CompleteTab />;
  // const Ongoing = () => <OngoingTab />;
  // const All = () => <AllTab />;

  const Tab = createMaterialTopTabNavigator();


  const MyWorkTabs = (props) => {
    const Complete = () => <CompleteTab {...props} />;
    const Ongoing = () => <OngoingTab  {...props} />;
    const All = () => <AllTab  {...props} />;
    //console.log(props.value, 'on my work tabs')
    return (
      <Tab.Navigator
        style={{ minHeight: 1000 }}

        screenOptions={{
          tabBarActiveTintColor: color.yellow, // Change this to your desired active tab color (yellow)
          tabBarInactiveTintColor: color.default,
          activeBackgroundColor: color.bodyColor,
          activeTintColor: color.yellow,

          tabBarLabelStyle: ({ focused }) => ({
            fontSize: 20,
            textTransform: focused ? 'lowercase' : 'capitalize',
            fontWeight: 'bold',
            color: focused ? color.yellow : color.default,
          }),
          tabBarStyle: {
            backgroundColor: color.bodyColor,
            elevation: 0,
            alignSelft: 'center',
            marginTop: 40,
          },


          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: color.yellow,
          },

        }}

      >
        <Tab.Screen
          name="Complete"
          component={Complete}
          options={{
            header: () => null,
            title: 'Complete',
            headerTitleStyle: {
              color: color.Green,
              fontSize: 30,
              textTransform: 'lowercase',
            },
            // headerTintColor: color.Green,
          }}
        />
        <Tab.Screen
          name="Ongoing"
          component={Ongoing}
          options={{
            header: () => null,
            title: 'Ongoing',
            headerTitleStyle: {
              color: color.btnColor,
              fontSize: 30,
              textTransform: 'lowercase',
            },
            // headerTintColor: color.Green,
          }}
        />
        <Tab.Screen
          name="AllTab"
          component={All}
          options={{
            header: () => null,
            title: 'All',
            headerTitleStyle: {
              color: color.btnColor,
              fontSize: 30,
              textTransform: 'lowercase',
            },
            // headerTintColor: color.Green,
          }}
        />
      </Tab.Navigator>
    );
  };

  export default MyWorkTabs;