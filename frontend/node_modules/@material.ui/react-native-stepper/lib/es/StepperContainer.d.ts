import { ReactElement } from 'react';
import { StepView } from '.';
declare type Props = {
    themeColor?: string;
    buttonStyle?: {
        [key: string]: any;
    };
    contentViewStyle?: {
        [key: string]: any;
    };
    submitButtonText?: string;
    children: ReactElement<typeof StepView>[];
    layout?: 'vertical' | 'horizontal';
    allowTapOnTitle?: boolean;
    onTitleTap?: Function;
};
export declare function StepperContainer({ themeColor, layout, submitButtonText, contentViewStyle, allowTapOnTitle, children, }: Props): JSX.Element;
export {};
