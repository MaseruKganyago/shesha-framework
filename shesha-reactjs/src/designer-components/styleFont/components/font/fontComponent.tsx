import { Col, Input, Radio, Row, Select } from 'antd';
import React, { FC } from 'react';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, PicCenterOutlined } from '@ant-design/icons';
import SettingsFormItem from '@/designer-components/_settings/settingsFormItem';
import { ColorPicker } from '@/components';
import { IValueWithUnit } from '@/designer-components/styleDimensions/components/size/sizeComponent';
import { IFontValue } from './interfaces';

const { Option } = Select;

const fontTypes = [
    'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana',
    'Georgia', 'Palatino', 'Garamond', 'Comic Sans MS', 'Trebuchet MS',
    'Arial Black', 'Impact',
];

const fontWeights = [
    { value: 100, title: 'thin' },
    { value: 200, title: 'extra-light' },
    { value: 300, title: 'light' },
    { value: 400, title: 'normal' },
    { value: 500, title: 'medium' },
    { value: 600, title: 'semi-bold' },
    { value: 700, title: 'bold' },
    { value: 800, title: 'extra-bold' },
    { value: 900, title: 'black' },
];

const units = ['px', 'em', 'rem', '%'];

const alignOptions = [
    { value: 'left', icon: <AlignLeftOutlined />, title: 'Left' },
    { value: 'center', icon: <AlignCenterOutlined />, title: 'Center' },
    { value: 'right', icon: <AlignRightOutlined />, title: 'Right' },
    { value: 'justify', icon: <PicCenterOutlined />, title: 'Justify' },
];

interface IDropdownProps {
    updateValue: (newValue: Partial<IFontValue>) => void;
    value: IFontValue;
    options: any[];
    field: string;
    labelField?: string;
    valueField?: string;
}

const Dropdown: FC<IDropdownProps> = ({ updateValue, value, options, field, labelField = 'title', valueField = 'value' }) => (
    <Select
        value={value?.[field]}
        onChange={(newValue) => updateValue({ [field]: newValue })}
    >
        {options.map(option => (
            <Option key={option[valueField]} value={option[valueField]}>
                {field === 'weight' ? option.value + ' ' + option.title : option[labelField]}
            </Option>
        ))}
    </Select>
);


export interface IFontType {
    onChange?: (value: any) => void;
    value?: IFontValue;
    readOnly?: boolean;
    model?: any;
}

const FontComponent: FC<IFontType> = ({ onChange, readOnly, value, model }) => {
    const updateValue = (newValue: Partial<IFontValue>) => {
        const updatedValue = { ...model, font: { ...value, ...newValue } };
        onChange(updatedValue);
    };

    const renderSizeInputWithUnits = (property, label, noUnits?: boolean) => {
        const currentValue = value?.[property] || { value: '', unit: 'px' };

        const selectAfter = (
            <Select
                value={currentValue.unit}
                onChange={(unit) => updateValue({ [property]: { ...currentValue, unit } })}
            >
                {units.map(unit => <Option key={unit} value={unit}>{unit}</Option>)}
            </Select>
        );

        return (
            <Col className="gutter-row" span={12}>
                <SettingsFormItem name={`font.${property}.value`} label={label} jsSetting>
                    <Input
                        addonAfter={noUnits ? null : selectAfter}
                        value={currentValue.value}
                        readOnly={readOnly}
                        onChange={(e) => updateValue({ [property]: { ...currentValue, value: e.target.value } })}
                    />
                </SettingsFormItem>
            </Col>
        );
    };

    return (
        <Row gutter={[8, 8]} style={{ fontSize: '11px' }}>
            <Col className="gutter-row" span={24}>
                <SettingsFormItem name="font.color" label="Font color" jsSetting>
                    <ColorPicker value={value?.color} readOnly={readOnly} />
                </SettingsFormItem>
            </Col>
            <Col className="gutter-row" span={24}>
                <Row gutter={[8, 2]} style={{ fontSize: '11px' }}>
                    {renderSizeInputWithUnits("size", "Font Size", true)}
                    {renderSizeInputWithUnits("lineHeight", "Line Height", true)}
                </Row>

                <Row gutter={[8, 2]} style={{ fontSize: '11px' }}>
                    <Col className="gutter-row" span={12}>
                        <SettingsFormItem name="font.weight" label="Font Weight" jsSetting>
                            <Dropdown updateValue={updateValue} value={value} options={fontWeights} field="weight" labelField={null} />
                        </SettingsFormItem>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <SettingsFormItem name="font.type" label="Font Family" jsSetting>
                            <Dropdown updateValue={updateValue} value={value} options={fontTypes.map(type => ({ value: type }))} field="type" />
                        </SettingsFormItem>
                    </Col>
                </Row>

                <Col className="gutter-row" span={24}>
                    <SettingsFormItem readOnly={readOnly} name="font.align" label="Align" jsSetting>
                        <Radio.Group value={value?.align} onChange={(e) => updateValue({ align: e.target.value })}>
                            {alignOptions.map(({ value, icon, title }) => (
                                <Radio.Button key={value} value={value} title={title}>{icon}</Radio.Button>
                            ))}
                        </Radio.Group>
                    </SettingsFormItem>
                </Col>
            </Col>
        </Row>
    );
};

export default FontComponent;