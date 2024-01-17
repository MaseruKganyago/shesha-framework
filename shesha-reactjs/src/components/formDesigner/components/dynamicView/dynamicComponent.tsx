import { useDeepCompareMemo } from '@/hooks';
import React, { FC, useRef } from 'react';
import { getActualModelWithParent, useApplicationContext } from '@/utils/publicUtils';
import { CustomErrorBoundary } from '../../..';
import { IConfigurableFormComponent } from '@/interfaces';
import { useParent } from '@/providers/parentProvider/index';

export interface IConfigurableFormComponentProps {
  model: IConfigurableFormComponent;
}

const DynamicComponent: FC<IConfigurableFormComponentProps> = ({ model }) => {
  const allData = useApplicationContext();
  const { form, getToolboxComponent } = allData.form;

  const componentRef = useRef();
  const toolboxComponent = getToolboxComponent(model.type);
  const parent = useParent(false);

  const actualModel: IConfigurableFormComponent = useDeepCompareMemo(() => {
    return getActualModelWithParent(
      {...model, editMode: typeof model.editMode === 'undefined' ? undefined : model.editMode}, // add editMode property if not exists
      allData, parent);
  }, [model, parent, allData.contexts.lastUpdate, allData.data, allData.globalState, allData.selectedRow]);

  if (!toolboxComponent) return null;

  // ToDo: AS review hidden and enabled for SubForm
  actualModel.hidden = actualModel.hidden;// || !isComponentFiltered(model); // check `model` without modification
  actualModel.readOnly = actualModel.readOnly;// || isComponentReadOnly(model); // check `model` without modification

  const renderComponent = () => {
    return (
      <CustomErrorBoundary>
        <toolboxComponent.Factory model={actualModel} componentRef={componentRef} form={form}/>
      </CustomErrorBoundary>
    );
  };

  return renderComponent();
};

export default DynamicComponent;
