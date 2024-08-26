declare type Props = {
    position: number;
    title?: string;
    subTitle?: string;
    allowTapOnTitle: boolean;
    onTitleTap?: Function;
};
export declare function StepHeaderView({ position, title, subTitle, allowTapOnTitle, onTitleTap }: Props): JSX.Element;
export {};
