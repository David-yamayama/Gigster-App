import React, { ReactElement } from 'react';
declare type ContextProps = {
    activeStep: number;
    stepCount: number;
    themeColor: string;
    jumpStep: ((type: 'up' | 'down') => void) | undefined;
    jumpToStep: ((newStep: number) => void) | undefined;
};
export declare const StepContext: React.Context<ContextProps>;
export declare function useStep(): ContextProps;
declare type Props = {
    children: ReactElement[];
    themeColor: string;
    submitButtonText: string;
    allowTapOnTitle: boolean;
};
export declare const StepProvider: ({ children, themeColor, submitButtonText, allowTapOnTitle }: Props) => JSX.Element;
export {};
