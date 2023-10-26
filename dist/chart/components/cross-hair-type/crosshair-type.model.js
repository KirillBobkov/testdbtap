import React from 'react';
import { CrosshairIcon } from './icons/crosshair';
import { NoCrosshairIcon } from './icons/no-crosshair';
export const crosshairTypes = ['NoCrosshair', 'Crosshair'];
export function isCrosshairType(value) {
    const types = crosshairTypes;
    return typeof value === 'string' && types.includes(value);
}
export const mapTypeToString = (type) => {
    switch (type) {
        case 'Crosshair':
            return 'Crosshair';
        case 'NoCrosshair':
            return 'No Crosshair';
    }
};
export const mapTypeToChartSettings = (value) => {
    switch (value) {
        case 'Crosshair':
            return true;
        case 'NoCrosshair':
            return false;
    }
};
export const mapChartSettingsToType = (type) => {
    return type !== 'none' ? 'Crosshair' : 'NoCrosshair';
};
export const mapTypeToIcon = (type) => {
    switch (type) {
        case 'Crosshair':
            return React.createElement(CrosshairIcon, null);
        case 'NoCrosshair':
            return React.createElement(NoCrosshairIcon, null);
        default:
            return null;
    }
};
