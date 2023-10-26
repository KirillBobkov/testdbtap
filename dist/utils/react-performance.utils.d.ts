import React, { FC } from 'react';
/**
 * Creates a wrapper component for profiling.
 * @param name - name of original component
 * @param Component - original component
 */
export declare const createProfileFC: <A extends Record<string, any>>(name: string, Component: React.FC<A>) => React.FC<A>;
