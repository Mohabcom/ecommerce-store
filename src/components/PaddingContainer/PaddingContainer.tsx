'use client';

type Props = {
    children?: JSX.Element[] | JSX.Element;
    className?: string;
};

export default function PaddingContainer({ children, className }: Props) {
    let classes = 'max-w-[1368px] xl:max-w-full 2xl:w-[80vw] mx-auto ';
    if (className) {
        classes = classes.concat(` ${className}`);
    }
    return <div className={classes}>{children}</div>;
}
