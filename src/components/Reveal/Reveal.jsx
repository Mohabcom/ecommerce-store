"use client"
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function Reveal({ children, className, delay = 0.25 }) {
    let classes = 'relative overflow-hidden';
    if (className) {
        classes = classes.concat(` ${className}`);
    }

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();
    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
        }
    }, [isInView]);

    return (
        <div ref={ref} className={classes}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.3, delay }}
            >
                {children}
            </motion.div>
        </div>
    );
}
