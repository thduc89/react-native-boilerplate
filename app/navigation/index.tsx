import React, { useContext } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useTranslation } from 'react-i18next';
import { ParamList } from 'app/navigation/types';
import { ThemeContext } from 'app/theme';
import AppMessageLayout from 'app/components/AppMessageLayout';

import ClientListScreen from 'app/screens/ClientList';
import ClientDetailsScreen from 'app/screens/ClientDetails';
import NasaRoverListScreen from 'app/screens/Nasa/RoverList';
import NasaCameraListScreen from 'app/screens/Nasa/CameraList';
import NasaPhotoListScreen from 'app/screens/Nasa/PhotoList';
import NasaPhotoDetailsSwipeableListScreen from 'app/screens/Nasa/PhotoDetailsSwipeableList';
import SettingsScreen from 'app/screens/Settings';

const ClientStack = createStackNavigator<ParamList>();
const ClientStackScreen: React.FC = () => {
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);

    return (
        <ClientStack.Navigator
            initialRouteName='ClientListScreen'
            screenOptions={{
                headerTitleStyle: theme.styles.headerTitle,
                headerStyle: theme.styles.header,
                headerTintColor: theme.colors.activeTintColor,
                headerBackTitleVisible: false,
            }}
        >
            <ClientStack.Screen
                name='ClientListScreen'
                component={ClientListScreen}
                options={{
                    title: t('ClientListScreen:screenTitle'),
                }}
            />
            <ClientStack.Screen
                name='ClientDetailsScreen'
                component={ClientDetailsScreen}
                options={(props) => ({
                    title: props.route.params.title,
                })}
            />
        </ClientStack.Navigator>
    );
};

const NasaTab = createMaterialTopTabNavigator();
const NasaTabScreen: React.FC = () => {
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);
    return (
        <NasaTab.Navigator
            initialRouteName='NasaRoverListScreen'
            tabBarOptions={{
                labelStyle: theme.styles.tabLabel,
                tabStyle: theme.styles.tab,
                activeTintColor: theme.colors.activeTintColor,
                inactiveTintColor: theme.colors.inactiveTintColor,
                style: theme.styles.tab,
            }}
        >
            <NasaTab.Screen
                name='NasaRoverListScreen'
                component={NasaRoverListScreen}
                options={{
                    title: t('NasaRoverListScreen:screenTitle'),
                }}
            />
            <NasaTab.Screen
                name='NasaCameraListScreen'
                component={NasaCameraListScreen}
                options={{
                    title: t('NasaCameraListScreen:screenTitle'),
                }}
            />
        </NasaTab.Navigator>
    );
};

const NasaStack = createStackNavigator<ParamList>();
const NasaStackScreen: React.FC = () => {
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);
    return (
        <NasaStack.Navigator
            initialRouteName='NasaTabScreen'
            screenOptions={{
                headerTitleStyle: theme.styles.headerTitle,
                headerStyle: theme.styles.header,
                headerTintColor: theme.colors.activeTintColor,
                headerBackTitleVisible: false,
            }}
        >
            <NasaTab.Screen
                name='NasaTabScreen'
                component={NasaTabScreen}
                options={{
                    title: t('NasaTabScreen:screenTitle'),
                }}
            />
            <NasaStack.Screen
                name='NasaPhotoListScreen'
                component={NasaPhotoListScreen}
                options={(props) => ({
                    title: props.route.params.title,
                })}
            />
            <NasaStack.Screen
                name='NasaPhotoDetailsSwipeableListScreen'
                component={NasaPhotoDetailsSwipeableListScreen}
                options={(props) => ({
                    title: '', // TODO props.route.params.id,
                    gestureEnabled: false,
                })}
            />
        </NasaStack.Navigator>
    );
};

const SettingsStack = createStackNavigator<ParamList>();
const SettingsStackScreen: React.FC = () => {
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);

    return (
        <SettingsStack.Navigator
            initialRouteName='SettingsScreen'
            screenOptions={{
                headerTitleStyle: theme.styles.headerTitle,
                headerStyle: theme.styles.header,
                headerTintColor: theme.colors.activeTintColor,
                headerBackTitleVisible: false,
            }}
        >
            <SettingsStack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={{
                    title: t('SettingsScreen:screenTitle'),
                }}
            />
        </SettingsStack.Navigator>
    );
};

const MainTab = createBottomTabNavigator();
const MainTabScreen: React.FC = () => {
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);

    return (
        <MainTab.Navigator
            initialRouteName='NasaStackScreen'
            tabBarOptions={{
                labelStyle: theme.styles.tabLabel,
                tabStyle: theme.styles.tab,
                activeTintColor: theme.colors.activeTintColor,
                inactiveTintColor: theme.colors.inactiveTintColor,
                style: theme.styles.tab,
            }}
        >
            <MainTab.Screen
                name='ClientStackScreen'
                component={ClientStackScreen}
                options={{
                    title: t('tabBar:clients'),
                    tabBarIcon: (props) => <Icon name='user-friends' size={16} color={props.color}/>,
                }}
            />
            <MainTab.Screen
                name='NasaStackScreen'
                component={NasaStackScreen}
                options={{
                    title: t('tabBar:nasa'),
                    tabBarIcon: (props) => <Icon name='globe' size={16} color={props.color}/>,
                }}
            />
            <MainTab.Screen
                name='SettingsStackScreen'
                component={SettingsStackScreen}
                options={{
                    title: t('tabBar:settings'),
                    tabBarIcon: (props) => <Icon name='cog' size={16} color={props.color} light/>,
                }}
            />
        </MainTab.Navigator>
    );
};

const AppNavigation: React.FC = () => {
    return (
        <NavigationNativeContainer>
            <AppMessageLayout>
                <MainTabScreen/>
            </AppMessageLayout>
        </NavigationNativeContainer>
    );
};

export default AppNavigation;
