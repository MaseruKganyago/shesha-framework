import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import { FormLayout } from 'antd/lib/form/Form';
import { nanoid } from '@/utils/uuid';

export const getSettings = (data: any) => {
  return {
    components: new DesignerToolbarSettings(data)
      .addSearchableTabs({
        id: nanoid(),
        propertyName: 'settingsTabs',
        parentId: 'root',
        label: 'Settings',
        hideLabel: true,
        labelAlign: 'right',
        size: 'small',
        tabs: [
          {
            key: '1',
            title: 'Common',
            id: nanoid(),
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: nanoid(),
                  propertyName: 'propertyName',
                  parentId: 'root',
                  label: 'Property Name',
                  inputType: 'propertyAutocomplete',
                  validate: { required: true },
                })
                .addSettingsInput({
                  id: nanoid(),
                  propertyName: 'label',
                  label: 'Label',
                  jsSetting: true,
                })
                .addSettingsInput({
                  id: nanoid(),
                  propertyName: 'hideLabel',
                  label: 'Hide Label',
                  inputType: 'switch',
                  jsSetting: true,
                })
                .addSettingsInput({
                  id: nanoid(),
                  propertyName: 'percent',
                  label: 'Percent',
                  inputType: 'number',
                  min: 0,
                  max: 100,
                  description: 'To set the completion percentage',
                  jsSetting: true,
                })
                .addSettingsInput({
                  id: nanoid(),
                  propertyName: 'showInfo',
                  label: 'Show Info',
                  inputType: 'switch',
                  defaultValue: true,
                  jsSetting: true,
                })
                .toJson(),
            ],
          },
          {
            key: 'appearance',
            title: 'Appearance',
            id: nanoid(),
            components: [
              ...new DesignerToolbarSettings()
                .addCollapsiblePanel({
                  id: nanoid(),
                  propertyName: 'progressStyle',
                  label: 'Progress Style',
                  labelAlign: 'right',
                  ghost: true,
                  collapsible: 'header',
                  content: {
                    id: nanoid(),
                    components: [
                      ...new DesignerToolbarSettings()
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'progressType',
                          label: 'Type',
                          inputType: 'dropdown',
                          dropdownOptions: [
                            { label: 'Line', value: 'line' },
                            { label: 'Circle', value: 'circle' },
                            { label: 'Dashboard', value: 'dashboard' },
                          ],
                          validate: { required: true },
                          jsSetting: true,
                        })
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'status',
                          label: 'Status',
                          inputType: 'dropdown',
                          dropdownOptions: [
                            { label: 'success', value: 'success' },
                            { label: 'exception', value: 'exception' },
                            { label: 'normal', value: 'normal' },
                            { label: 'active', value: 'active' },
                          ],
                          description: 'To set the status of the Progress.',
                          jsSetting: true,
                        })
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'strokeColor',
                          label: 'Stroke Color',
                          inputType: 'color',
                          description: "The color of progress bar. This will be 'overridden' by the the 'strokeColor' property of 'line' and 'circle' types",
                          jsSetting: true,
                        })
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'strokeLinecap',
                          label: 'Stroke Linecap',
                          inputType: 'dropdown',
                          dropdownOptions: [
                            { label: 'round', value: 'round' },
                            { label: 'butt', value: 'butt' },
                            { label: 'square', value: 'square' },
                          ],
                          defaultValue: 'round',
                          validate: { required: true },
                          jsSetting: true,
                        })
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'strokeWidth',
                          label: 'Stroke Width',
                          inputType: 'number',
                          description: 'To set the width of the circular progress, unit: percentage of the canvas width in px',
                          defaultValue: 6,
                          jsSetting: true,
                        })
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'width',
                          label: 'Width',
                          inputType: 'number',
                          description: 'To set the canvas width of the circular progress, unit: px',
                          hidden: { _code: 'return !["circle", "dashboard"].includes(getSettingValue(data?.progressType));', _mode: 'code', _value: false },
                          jsSetting: true,
                        })
                        .toJson()
                    ]
                  }
                })
                .addCollapsiblePanel({
                  id: nanoid(),
                  propertyName: 'typeSpecificSettings',
                  label: 'Type Specific Settings',
                  labelAlign: 'right',
                  ghost: true,
                  collapsible: 'header',
                  content: {
                    id: nanoid(),
                    components: [
                      ...new DesignerToolbarSettings()
                        // Line specific settings
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'steps',
                          label: 'Steps',
                          inputType: 'number',
                          description: 'The total step count',
                          hidden: { _code: 'return getSettingValue(data?.progressType) !== "line";', _mode: 'code', _value: false },
                          jsSetting: true,
                        })
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'lineStrokeColor',
                          label: 'Line Stroke Color',
                          inputType: 'codeEditor',
                          description: 'The color of progress bar, render linear-gradient when passing an object, could accept string[] when has steps',
                          hidden: { _code: 'return getSettingValue(data?.progressType) !== "line";', _mode: 'code', _value: false },
                          mode: 'dialog',
                          jsSetting: true,
                        })
                        // Circle specific settings
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'circleStrokeColor',
                          label: 'Circle Stroke Color',
                          inputType: 'codeEditor',
                          description: 'The color of circular progress, render linear-gradient when passing an object',
                          hidden: { _code: 'return getSettingValue(data?.progressType) !== "circle";', _mode: 'code', _value: false },
                          mode: 'dialog',
                          jsSetting: true,
                        })
                        // Dashboard specific settings
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'gapDegree',
                          label: 'Gap Degree',
                          inputType: 'number',
                          min: 0,
                          max: 295,
                          hidden: { _code: 'return getSettingValue(data?.progressType) !== "dashboard";', _mode: 'code', _value: false },
                          jsSetting: true,
                        })
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'gapPosition',
                          label: 'Gap Position',
                          inputType: 'dropdown',
                          dropdownOptions: [
                            { label: 'top', value: 'top' },
                            { label: 'bottom', value: 'bottom' },
                            { label: 'left', value: 'left' },
                            { label: 'right', value: 'right' },
                          ],
                          hidden: { _code: 'return getSettingValue(data?.progressType) !== "dashboard";', _mode: 'code', _value: false },
                          validate: { required: true },
                          jsSetting: true,
                        })
                        .toJson()
                    ]
                  }
                })
                .addCollapsiblePanel({
                  id: nanoid(),
                  propertyName: 'formatPanel',
                  label: 'Format & Success',
                  labelAlign: 'right',
                  ghost: true,
                  collapsible: 'header',
                  content: {
                    id: nanoid(),
                    components: [
                      ...new DesignerToolbarSettings()
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'format',
                          label: 'Format',
                          inputType: 'codeEditor',
                          description: 'The template function of the content. This function should return string or number',
                          mode: 'dialog',
                          // exposedVariables: [
                          //   {
                          //     name: 'percent',
                          //     description: 'Progress percentage',
                          //     type: 'number',
                          //   },
                          //   {
                          //     name: 'successPercent',
                          //     description: 'success percentage',
                          //     type: 'number',
                          //   },
                          // ],
                          // wrapInTemplate: true,
                          // templateSettings: {
                          //   functionName: 'getFormat',
                          // },
                          jsSetting: true,
                        })
                        .addSettingsInput({
                          id: nanoid(),
                          propertyName: 'success',
                          label: 'Success',
                          inputType: 'codeEditor',
                          description: 'Configs of successfully progress bar. Returns an object of this format: { percent: number, strokeColor: string }',
                          mode: 'dialog',
                          //wrapInTemplate: true,
                          // templateSettings: {
                          //   functionName: 'getSuccess',
                          // },
                          jsSetting: true,
                        })
                        .toJson()
                    ]
                  }
                })
                .toJson()
            ]
          },
          {
            key: 'security',
            title: 'Security',
            id: nanoid(),
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: nanoid(),
                  propertyName: 'permissions',
                  label: 'Permissions',
                  inputType: 'permissions',
                  labelAlign: 'right',
                  validate: {},
                  jsSetting: false,
                })
                .toJson()
            ]
          }
        ]
      })
      .toJson(),
    formSettings: {
      colon: false,
      layout: 'vertical' as FormLayout,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    },
  };
};