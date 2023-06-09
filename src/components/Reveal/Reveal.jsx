import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function Reveal({ children, className }) {
    let classes = 'relative overflow-hidden';
    if (className) {
        classes = classes.concat(` ${className}`);
    }

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation()
    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])
    
    return (
        <div ref={ref} className={classes}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
