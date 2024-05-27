import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import color from '../Assets/colors/colors';
import {Picker} from '@react-native-picker/picker';

const ProductOptions = (props, {navigation}) => {
  //const [selectedBusiness, setselectedBusiness] = useState(props.selectedValue);
  const pickerRef = useRef();

  const businessOptions = [
    {label: 'Select Action', value: '0'},
    {label: 'Inprogress', value: 'progress'},
    {label: 'Complete', value: 'complete'},
    {label: 'Reject', value: 'reject'},
  ];

  return (
    <View style={styles.DropDownContainer}>
      <Picker
        ref={pickerRef}
        selectedValue={props.selectedBusiness}
        onValueChange={(itemValue, itemIndex) =>
          props.setselectedBusiness(itemValue)
        }
        enabled={true}
        mode={'dialog'}
        dropdownIconColor={color.default}
        prompt={props.titleText}
        selectionColor={color.yellow}
        itemStyle={styles.itemsStyle}>
        {businessOptions.map((option, index) => (
          <Picker.Item
            key={index}
            label={option.label}
            value={option.value}
            color={color.default}
          />
        ))}
      </Picker>
    </View>
  );
};

export default ProductOptions;

const styles = StyleSheet.create({
  DropDownContainer: {
    borderColor: color.default,
    borderWidth: 1,
    paddingHorizontal: 5,
    width: '100%',
    borderRadius: 6,
    marginTop: 6,
    height: 53,
  },
  itemsStyle: {
    color: color.red,
    fontWeight: '400',
  },
  containerStyle: {
    zIndex: 100,
  },
});
