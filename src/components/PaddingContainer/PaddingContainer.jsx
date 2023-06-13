"use client"

export default function PaddingContainer({ children, className }) {
    let classes = 'max-w-[1368px] mx-auto ';
    if (className) {
        classes = classes.concat(` ${className}`)
    }
    return <div className={classes}>{children}</div>;
}
