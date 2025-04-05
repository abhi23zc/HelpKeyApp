import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    FlexAlignType,
    Dimensions,
    StatusBar,
    SafeAreaView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/src/api/auth';
import { ActivityIndicator } from 'react-native-paper';
import { onLoading, reset } from '@/src/store/features/authFeature/auth.slice';



const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { error, msg, token, isAuthenticated, isLoading } = useSelector((state) => state.auth);

    const handleLogin = async () => {
       
        if (!email || !password) {
            alert("Please fill in all the fields")
            return;
        }
        // dispatch(reset)
        
        if(error){
            alert(error);
            return;
        }
        await loginUser(dispatch, email, password);
        dispatch(onLoading(false))
    };

    useEffect(() => {
        if(error){
            alert(error);
            dispatch(reset(null))
            return;
        }
        if (isAuthenticated) {
            router.push("/(tabs)/home")
        }
    }, [error, msg, token, isAuthenticated]);

    return (
        <SafeAreaView style={{
            flex:1
        }}>
        <View style={[styles.container]}>

            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <LinearGradient
                colors={['#3b82f6', '#1e40af']}
                style={styles.headerBackground}
            >
                <View style={styles.helpKeyContainer}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        <FontAwesome name="life-ring" size={32} color="#ffffff" />
                        <Text style={styles.helpKeyText}>HelpKey</Text>
                    </View>
                    <Text style={styles.helpKeySubtext}>Your trusted hotel companion</Text>
                </View>
            </LinearGradient>
            <View style={styles.scrollContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>Get Started now</Text>

                    <View style={styles.inputContainer}>
                        <FontAwesome name="envelope" size={20} style={styles.icon} />
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <FontAwesome name="lock" size={20} style={styles.icon} />
                        <TextInput
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <FontAwesome
                                name={showPassword ? "eye-slash" : "eye"}
                                size={20}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        display: 'flex',
                        alignItems: "flex-end",
                        margin: 10,
                    }}>
                        <TouchableOpacity onPress={() => {
                            router.push("/auth/ForgotEmail")
                        }}>
                            <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
                        {
                            isLoading ?
                                <ActivityIndicator color='white' /> :
                                <Text style={styles.registerButtonText}>Login</Text>
                        }
                    </TouchableOpacity>

                    <View style={styles.orContainer}>
                        <View style={styles.orLine} />
                        <Text style={styles.orText}>Or</Text>
                        <View style={styles.orLine} />
                    </View>

                    <View style={styles.socialButtonContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <FontAwesome name="google" size={24} color="#DB4437" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <FontAwesome name="facebook" size={24} color="#3b5998" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.loginContainer}>
                        <Text style={{ color: '#888' }}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/auth/Register")}>
                            <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        width: 'auto',
        backgroundColor: '#f0f4f8',
    } as ViewStyle,
    scrollContainer: {
        position: 'absolute',
        top: 150,
        width: width,
        height: height,
    } as ViewStyle,
    card: {
        paddingTop: 50,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        height: height
    } as ViewStyle,
    title: {
        fontSize: 24,
        fontWeight: 'bold' as 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 25,
    } as TextStyle,
    inputContainer: {
        flexDirection: 'row' as 'row',
        alignItems: 'center' as FlexAlignType,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
    } as ViewStyle,
    icon: {
        marginRight: 10,
        color: '#888',
    } as TextStyle,
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    } as TextStyle,
    registerButton: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center' as FlexAlignType,
        marginBottom: 15,
    } as ViewStyle,
    registerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold' as 'bold',
    } as TextStyle,
    orContainer: {
        flexDirection: 'row' as 'row',
        alignItems: 'center' as FlexAlignType,
        marginVertical: 15,
    } as ViewStyle,
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    } as ViewStyle,
    orText: {
        marginHorizontal: 10,
        color: '#888',
    } as TextStyle,
    socialButtonContainer: {
        flexDirection: 'row' as 'row',
        justifyContent: 'center' as FlexAlignType,
        marginBottom: 15,
    } as ViewStyle,
    socialButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 10,
    } as ViewStyle,
    loginContainer: {
        flexDirection: 'row' as 'row',
        justifyContent: 'center' as FlexAlignType,
    } as ViewStyle,
    headerBackground: {
        height: 200,
        borderBottomRightRadius: 20,
        position: 'relative',
    } as ViewStyle,
    helpKeyContainer: {
        marginTop: (StatusBar.currentHeight || 0) + 15,
        alignItems: 'center',
        gap: 5,
    } as ViewStyle,
    helpKeyText: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold' as 'bold',
    } as TextStyle,
    helpKeySubtext: {
        color: '#ffffff',
        fontSize: 16,
        marginTop: 5,
    } as TextStyle,
};