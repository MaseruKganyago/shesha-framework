import React, { FC } from 'react';
import { Button, Input, InputNumber, Radio, Select, Switch } from "antd";
import FormItem from "./formItem";
import { ColorPicker } from '@/components';
import { useSearchQuery } from './tabs/context';
import CustomDropdown from './CustomDropdown';

const units = ['px', '%', 'em', 'rem', 'vh', 'svh', 'vw', 'svw', 'auto'];
interface IRadioOption {
    value: string | number;
    icon?: React.ReactNode;
    title?: string;
}

export interface IDropdownOption {
    label: string;
    value: string;
}

interface SettingsRadioGroupProps {
    options: IRadioOption[];
    value: string;
    type: string;
    property?: string;
    name: string;
}

interface IInputProps {
    label: string;
    property: string;
    type?: 'color' | 'dropdown' | 'radio' | 'switch' | 'button' | 'number' | 'customDropdown';
    buttonGroupOptions?: IRadioOption[];
    dropdownOptions?: IDropdownOption[];
    readOnly: boolean;
    value: any;
    hasUnits?: boolean;
}

export const SettingsRadioGroup: React.FC<SettingsRadioGroupProps> = ({
    options,
    value,
    type,
    property,
    name
}) => {

    const label = `${type || ''} ${value} ${property || ''}`.trim();

    return (
        <FormItem
            name={name}
            label={label}
            jsSetting
        >
            <Radio.Group>
                {options.map(option => (
                    <Radio.Button
                        key={option.value}
                        value={option.value}
                        title={option.title}
                    >
                        {option.icon}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </FormItem>
    );
};

const { Option } = Select;

const UnitSelector: FC<{ property: string, value: any }> = ({ property, value }) => {
    const currentValue = value?.[property];
    return <FormItem name={property + '.unit'} jsSetting={false} >
        <Select
            value={currentValue?.unit || 'px'}
            dropdownStyle={{ width: '70px' }}
            style={{ margin: '0px', height: '24px', width: '70px', padding: 0 }}
        >
            {units.map(unit => (
                <Option key={unit} value={unit} >{unit}</Option>
            ))}
        </Select>
    </FormItem>
}

export const SettingInput: React.FC<IInputProps> = ({ label, property, type, buttonGroupOptions, dropdownOptions, readOnly, value, hasUnits }) => {
    const { searchQuery } = useSearchQuery();
    const currentValue = value?.[property];

    const input = () => {
        switch (type) {
            case 'color':
                return <ColorPicker value={value?.color} readOnly={readOnly} allowClear />;
            case 'dropdown':
                return <Select
                    value={currentValue}
                    size='small'
                >
                    {dropdownOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>;
            case 'radio':
                return <Radio.Group value={currentValue}>
                    {buttonGroupOptions.map(({ value, icon, title }) => (
                        <Radio.Button key={value} value={value} title={title}>{icon}</Radio.Button>
                    ))}
                </Radio.Group>;
            case 'switch':
                return <Switch disabled={readOnly} />;
            case 'number':
                return <InputNumber min={0} max={100} readOnly={readOnly} />
            case 'customDropdown':
                return <CustomDropdown value={currentValue} options={dropdownOptions} />
            default:
                return <Input
                    value={currentValue?.value ?? currentValue}
                    readOnly={readOnly}
                    addonAfter={hasUnits ? <UnitSelector property={property} value={value} /> : null}
                />;
        }
    }

    return label.toLowerCase().includes(searchQuery.toLowerCase()) ? (
        <div key={property} style={{ flex: '1 1 120px', minWidth: '100px' }}>
            <FormItem name={hasUnits ? property + '.value' : property} label={label} orientation='vertical' jsSetting >
                {input()}
            </FormItem>
        </div>) : null

};

interface InputRowProps {
    inputs: Array<IInputProps>;
}

export const InputRow: React.FC<InputRowProps> = ({ inputs }) => {

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0px 8px', width: '100%' }}>
            {inputs.map((props) => (
                <SettingInput {...props} />
            ))}
        </div>
    )
};

export const searchFormItems = (children: React.ReactNode, searchQuery: string): React.ReactNode => {

    if (!searchQuery) return children;

    return React.Children.map(children, (child) => {

        if (!React.isValidElement(child)) return null;

        if (child.key === null && !child.props.children) return child;

        if (child.type === 'div' || child.type === React.Fragment) {
            const nestedChildren = searchFormItems(child.props.children, searchQuery);
            return nestedChildren ? React.cloneElement(child, {}, nestedChildren) : null;
        }

        if (child.props.label && typeof child.props.label === 'string') {
            if (child.props.label.toLowerCase().includes(searchQuery.toLowerCase())) {
                return child;
            }
        }
        return null;
    });
};



interface SettingsRadioGroupProps {
    options: IRadioOption[];
    value: string;
    type: string;
    property?: string;
    name: string;
}
