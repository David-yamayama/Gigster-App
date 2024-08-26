import { ReactNode } from 'react';
declare type Props = {
    position?: number;
    title?: string;
    subTitle?: string;
    nextButtonText?: string;
    previousButtonText?: string;
    allowTapOnTitle?: boolean;
    onTitleTap?: Function;
    children: ReactNode;
    onNext?: (...params: any[]) => Promise<boolean | string>;
    onPrevious?: (...params: any[]) => Promise<boolean | string>;
};
export declare function StepView({ position, title, subTitle, children, onNext, onPrevious, nextButtonText, previousButtonText, allowTapOnTitle, onTitleTap, }: Props): JSX.Element;
export {};
