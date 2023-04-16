import { Input, IInputProps, } from 'native-base';
import * as React from 'react';
interface CustomInputProps extends IInputProps {} 

const CustomInput = (props: CustomInputProps) => {
  return (
    <Input
      {...props}
    />
  );
};

export default CustomInput;