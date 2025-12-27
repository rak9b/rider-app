import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

const GlassCard = ({ children, className, animate = true }: GlassCardProps) => {
    const content = (
        <div
            className={cn(
                'bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-2xl shadow-xl overflow-hidden',
                className
            )}
        >
            {children}
        </div>
    );

    if (!animate) return content;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {content}
        </motion.div>
    );
};

export default GlassCard;
