import React from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary'; 
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
}: CustomButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      // Style for button based on variant, disabled state, and pressed state
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.btnPrimary : styles.btnSecondary,
        disabled && styles.btnDisabled,
        pressed && { opacity: 0.7 },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={isPrimary ? '#ffffff' : '#0284c7'} />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

{/**Customize for button primary, secondary and disabled */}
const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  btnPrimary: {
    backgroundColor: '#0284c7', 
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderColor: '#0284c7', 
  },
  btnDisabled: {
    backgroundColor: '#e2e8f0', 
    borderColor: '#e2e8f0',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#ffffff',
  },
  textSecondary: {
    color: '#0284c7',
  },
});