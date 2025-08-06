import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import BootSplash from 'react-native-bootsplash';

// Suppress NativeEventEmitter warnings for react-native-bootsplash
if (__DEV__) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      args[0].includes &&
      (args[0].includes('new NativeEventEmitter') ||
        args[0].includes('addListener') ||
        args[0].includes('removeListeners'))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

const SplashScreen = ({ onAnimationEnd }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current; // For final fade out

  // Animation values for each letter of PRIFINA
  const letterAnims = useRef({
    P: { scale: new Animated.Value(1), color: new Animated.Value(0) }, // Start as white (0)
    R: { scale: new Animated.Value(1), color: new Animated.Value(0) },
    I: { scale: new Animated.Value(1), color: new Animated.Value(0) },
    F: { scale: new Animated.Value(1), color: new Animated.Value(0) },
    I2: { scale: new Animated.Value(1), color: new Animated.Value(0) },
    N: { scale: new Animated.Value(1), color: new Animated.Value(0) },
    A: { scale: new Animated.Value(1), color: new Animated.Value(0) },
  }).current;

  useEffect(() => {
    let pulseAnimation;
    let hideTimeout;

    const init = async () => {
      // Hide the native splash screen
      await BootSplash.hide({ fade: true });
      
      // Start beautiful animations sequence
      Animated.sequence([
        // Initial entrance
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]),
        // Letter by letter color change animation
        Animated.stagger(200, [
          // P
          Animated.parallel([
            Animated.timing(letterAnims.P.color, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.sequence([
              Animated.timing(letterAnims.P.scale, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(letterAnims.P.scale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]),
          ]),
          // R
          Animated.parallel([
            Animated.timing(letterAnims.R.color, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.sequence([
              Animated.timing(letterAnims.R.scale, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(letterAnims.R.scale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]),
          ]),
          // I
          Animated.parallel([
            Animated.timing(letterAnims.I.color, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.sequence([
              Animated.timing(letterAnims.I.scale, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(letterAnims.I.scale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]),
          ]),
          // F
          Animated.parallel([
            Animated.timing(letterAnims.F.color, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.sequence([
              Animated.timing(letterAnims.F.scale, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(letterAnims.F.scale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]),
          ]),
          // I2
          Animated.parallel([
            Animated.timing(letterAnims.I2.color, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.sequence([
              Animated.timing(letterAnims.I2.scale, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(letterAnims.I2.scale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]),
          ]),
          // N
          Animated.parallel([
            Animated.timing(letterAnims.N.color, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.sequence([
              Animated.timing(letterAnims.N.scale, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(letterAnims.N.scale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]),
          ]),
          // A
          Animated.parallel([
            Animated.timing(letterAnims.A.color, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.sequence([
              Animated.timing(letterAnims.A.scale, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(letterAnims.A.scale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]),
          ]),
        ]),
      ]).start();

      // Continuous pulse animation
      const pulse = () => {
        pulseAnimation = Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]);
        pulseAnimation.start(() => pulse());
      };

      setTimeout(() => pulse(), 1500);

      // Auto-hide after 3.5 seconds with fade-out animation
      hideTimeout = setTimeout(() => {
        // Call onAnimationEnd immediately to start main app transition
        if (onAnimationEnd) {
          onAnimationEnd();
        }
        
        // Start fade-out animation simultaneously
        Animated.parallel([
          Animated.timing(containerOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
      }, 3500);
    };

    init();

    // Cleanup function
    return () => {
      if (pulseAnimation) {
        pulseAnimation.stop();
      }
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [onAnimationEnd]);

  // Create animated letter component
  const AnimatedLetter = ({ letter, anim }) => {
    const colorValue = anim.color.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FFFFFF', '#000000'], // White to Black
    });

    return (
      <Animated.Text
        style={[
          styles.letter,
          {
            transform: [{ scale: anim.scale }],
            color: colorValue,
          },
        ]}
      >
        {letter}
      </Animated.Text>
    );
  };

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#ffffff" 
        translucent={false}
        hidden={false}
      />

      {/* Main Brand Section */}
      <Animated.View
        style={[
          styles.brandContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: Animated.multiply(scaleAnim, pulseAnim) },
            ],
          },
        ]}
      >
        <View style={styles.brandTextContainer}>
          <AnimatedLetter letter="P" anim={letterAnims.P} />
          <AnimatedLetter letter="R" anim={letterAnims.R} />
          <AnimatedLetter letter="I" anim={letterAnims.I} />
          <AnimatedLetter letter="F" anim={letterAnims.F} />
          <AnimatedLetter letter="I" anim={letterAnims.I2} />
          <AnimatedLetter letter="N" anim={letterAnims.N} />
          <AnimatedLetter letter="A" anim={letterAnims.A} />
        </View>
        <Text style={styles.tagline}>Your Personal AI Twin</Text>
      </Animated.View>

      {/* Animated Dots - moved to bottom above footer */}
      <Animated.View
        style={[
          styles.dotsContainer,
          { opacity: fadeAnim },
        ]}
      >
        <LoadingDot delay={0} />
        <LoadingDot delay={200} />
        <LoadingDot delay={400} />
      </Animated.View>

      {/* Footer */}
      <Animated.View
        style={[
          styles.footer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.footerText}>Powered by AI Technology</Text>
      </Animated.View>
    </Animated.View>
  );
};


const LoadingDot = ({ delay }) => {
  const dotScale = useRef(new Animated.Value(0.5)).current;
  const dotOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(dotScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dotScale, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(dotOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dotOpacity, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animate());
    };

    const timer = setTimeout(() => animate(), delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.loadingDot,
        {
          opacity: dotOpacity,
          transform: [{ scale: dotScale }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 9999,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 80,
    zIndex: 1,
  },
  brandTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  letter: {
    fontSize: 42,
    letterSpacing: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '700',
  },
 
  tagline: {
    fontSize: 14,
    color: '#666666',
    letterSpacing: 2,
    fontWeight: '400',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    zIndex: 1,
  },
  loadingDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#000000',
    marginHorizontal: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    zIndex: 1,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    letterSpacing: 1,
    fontWeight: '300',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});

export default SplashScreen;
