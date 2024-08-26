declare type ActionButtonProps = {
    hidden?: boolean;
    style?: {
        [key: string]: any;
    };
    title: string;
    color?: string;
    onPress: () => Promise<void>;
};
export declare const ActionButton: ({ hidden, style, color, title, onPress }: ActionButtonProps) => JSX.Element | null;
export {};
