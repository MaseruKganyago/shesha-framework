import { IConfigurableFormComponent } from '@/providers/form/models';
import { IBorderValue } from '../styleBorder/components/border/interfaces';
import { IBackgroundValue } from '../styleBackground/components/background/interfaces';
import { ISizeValue } from '../styleDimensions/components/size/sizeComponent';
import { IFontValue } from '../styleFont/components/font/interfaces';
import { IconType } from '@/components';

export type TextType = 'text' | 'password';

export interface ITextFieldComponentProps extends IConfigurableFormComponent {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  suffixIcon?: IconType;
  prefixIcon?: IconType;
  hideBorder?: boolean;
  initialValue?: string;
  passEmptyStringByDefault?: boolean;
  textType?: TextType;
  border?: IBorderValue;
  background?: IBackgroundValue;
  dimensions?: ISizeValue;
  font?: IFontValue;
}
