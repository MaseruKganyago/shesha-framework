import { IStyleType } from "@/index";

export const initialValues = (): IStyleType => {
    return {
        background: { type: 'color' },
        font: { weight: '400', size: 14, align: 'center', type: 'Segoe UI' },
        dimensions: { width: 'auto', height: '32px', minHeight: '0px', maxHeight: 'auto', minWidth: '0px', maxWidth: 'auto' },
        border: {
            selectedCorner: 'all', selectedSide: 'all', border: { all: { width: '1px', style: 'solid' } },
            radius: { all: 8 }
        },
    };
};