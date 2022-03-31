import {
  faGear,
  faHistory,
  faStreetView,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import {MainNavigatorRouteParams} from '../models/navigation';
import {Home} from '../screens/main/home';

export const MainNavigator: React.FC = () => {
  const Tab = createBottomTabNavigator<MainNavigatorRouteParams>();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {borderTopWidth: 0, elevation: 0, margin: '10px 0'},
      }}>
      <Tab.Screen
        name="History"
        component={() => (
          <View>
            <Text>asdasd</Text>
          </View>
        )}
        options={{
          tabBarIcon: ({focused, color, size}: any) => (
            <FontAwesomeIcon icon={faHistory} />
          ),
          tabBarLabel: '이용 기록',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}: any) => (
            <FontAwesomeIcon icon={faStreetView} />
          ),
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={() => (
          <View>
            <Text>asdasd</Text>
          </View>
        )}
        options={{
          tabBarIcon: ({focused, color, size}: any) => (
            <FontAwesomeIcon icon={faGear} />
          ),
          tabBarLabel: '설정',
        }}
      />
    </Tab.Navigator>
  );
};
