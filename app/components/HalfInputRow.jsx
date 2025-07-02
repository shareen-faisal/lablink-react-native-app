import React from 'react';
import { View } from 'react-native';
import FormInput from './FormInput';

const HalfInputRow = ({
  leftLabel,
  leftValue,
  onLeftChange,
  rightLabel,
  rightValue,
  onRightChange,
}) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ width: '48%' }}>
      <FormInput
        label={leftLabel}
        value={leftValue}
        onChangeText={onLeftChange}
        placeholder={`Enter ${leftLabel.toLowerCase()}`}
        keyboardType="numeric"  // Force numeric input
      />
    </View>
    <View style={{ width: '48%' }}>
      <FormInput
        label={rightLabel}
        value={rightValue}
        onChangeText={onRightChange}
        placeholder={`Enter ${rightLabel.toLowerCase()}`}
        keyboardType="numeric"  // Force numeric input
      />
    </View>
  </View>
);

export default HalfInputRow;
