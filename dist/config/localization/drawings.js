const drawingTypesNames = {
    fibonacci_time_zones: 'Fib Timezone',
    ellipse: 'Oval',
    fibonacci_ark: 'Fibonacci Arcs',
    fibonacci_circles: 'Fibonacci Circles',
    fibonacci_rays: 'Fibonacci Rays',
    gann_fan: 'Gann Fan',
    fibonacci_retracements: 'Fib Retracements',
    fibonacci_channel: 'Fib Channel',
    horizontal_ray: 'Horizontal Ray',
    path: 'Path',
    date_price_range: 'Date and Price Range',
    date_range: 'Date Range',
    price_range: 'Price Range',
    highlighter: 'Highlighter',
    icon: 'Icon',
    horizontal_line: 'Price Line',
    line: 'Trend Line',
    extended_line: 'Extended Line',
    brush: 'Brush',
    pitchfork: 'Pitchfork',
    info_line: 'Info Line',
    ray: 'Ray',
    curve: 'Curve',
    arc: 'Arc',
    vertical_arrow_down: 'Down Arrow',
    vertical_arrow_up: 'Up Arrow',
    arrow: 'Arrow',
    text: 'Text',
    vertical_line: 'Time Line',
    trend_channel: 'Trend Channel',
    rectangle: 'Rectangle',
    gann_box: 'Gann Box',
    gann_square: 'Gann Square',
    callout: 'Callout',
    price_label: 'Price Label',
    elliott_wave: 'Elliott Impulse (12345)',
    elliott_correction_wave: 'Elliott Correction (ABC)',
    fibonacci_projection: 'Fib Extension',
    regression_trend: 'Regression Trend',
    fibonacci_spiral: 'Fibonacci Spiral',
    cycle_brackets: 'Cycle Brackets',
    fibonacci_time_extension: 'Fibonacci Time Extension',
    fibonacci_time_ratios: 'Fibonacci Time Ratios',
    default: 'Not implemented',
};
const popupTitleByDrawingType = {
    fibonacci_time_zones: 'Fibonacci Time Zones',
    ellipse: 'Oval Settings',
    fibonacci_ark: 'Fibonacci Arcs Settings',
    fibonacci_circles: 'Fibonacci Circles Settings',
    fibonacci_rays: 'Fibonacci Rays Settings',
    gann_fan: 'Gann Fan Settings',
    fibonacci_retracements: 'Fibonacci Retracements Settings',
    fibonacci_channel: 'Fibonacci Channel Settings',
    horizontal_ray: 'Horizontal Ray',
    date_price_range: 'Date and Price Range Settings',
    date_range: 'Date Range Settings',
    price_range: 'Price Range Settings',
    path: 'Path Settings',
    highlighter: 'Highlighter Settings',
    icon: 'Icon Settings',
    horizontal_line: 'Price Line Settings',
    line: 'Trend Line Settings',
    extended_line: 'Extended Line Settings',
    brush: 'Brush',
    ray: 'Ray Settings',
    pitchfork: 'Pitchfork Settings',
    curve: 'Curve Settings',
    arc: 'Arc Settings',
    info_line: 'Info Line Settings',
    vertical_arrow_down: 'Down Arrow Settings',
    vertical_arrow_up: 'Up Arrow Settings',
    arrow: 'Arrow Settings',
    text: 'Text Settings',
    vertical_line: 'Time Line Settings',
    trend_channel: 'Trend Channel Settings',
    rectangle: 'Rectangle Settings',
    gann_box: 'Gann Box Settings',
    gann_square: 'Gann Square Settings',
    callout: 'Callout Settings',
    price_label: 'Price Label',
    elliott_wave: 'Elliott Impulse Wave Settings',
    elliott_correction_wave: 'Elliott Correction Wave Settings',
    fibonacci_projection: 'Fibonacci Extension Settings',
    regression_trend: 'Regression Trend Settings',
    fibonacci_spiral: 'Fibonacci Spiral Settings',
    cycle_brackets: 'Cycle Brackets Settings',
    fibonacci_time_extension: 'Fibonacci Time Extension Settings',
    fibonacci_time_ratios: 'Fibonacci Time Ratios Settings',
    default: 'Not implemented',
};
export const drawingsDictionary = {
    recentDrawings: 'Recent drawings',
    noRecentDrawings: 'No recent drawings',
    hideDrawings: 'Hide drawings',
    unhideDrawings: 'Unhide drawings',
    clearDrawings: 'Clear drawings',
    types: drawingTypesNames,
    dropdown: {
        hideBtn: 'Hide all Drawings',
        clearBtn: 'Clear All Drawings',
        showBtn: 'Show Drawings',
    },
    calendar: {
        dayAbb: {
            monday: 'MO',
            tuesday: 'TU',
            wednesday: 'WE',
            thursday: 'TH',
            friday: 'FR',
            saturday: 'SA',
            sunday: 'SU',
        },
        months: {
            january: 'January',
            february: 'February',
            march: 'March',
            april: 'April',
            may: 'May',
            june: 'June',
            july: 'July',
            august: 'August',
            september: 'September',
            october: 'October',
            november: 'November',
            december: 'December',
        },
    },
    colorPicker: {
        titles: {
            title: '',
            sides: 'Sides',
            basicAndStudies: 'Basic and indicators',
            common: 'Common',
        },
    },
    confirmationPopup: {
        title: 'Remove drawings',
        confirmationMessage: 'Are you sure you want to remove all drawings from chart?',
        cancel: 'Cancel',
        confirm: 'Delete',
    },
    popup: {
        title: popupTitleByDrawingType,
        sections: {
            default: 'Settings are not implemented',
            coordinates: {
                title: 'Coordinates',
                priceLabel: 'Price',
                timeLabel: 'Time',
                dateLabel: 'Date',
                timeCheckbox: 'Show time',
                priceCheckbox: 'Show price',
            },
            style: {
                title: 'Style',
                applyToAll: 'Apply to all',
                trendlineColorPicker: 'Trendline',
                medianColorPicker: 'Median',
                backgroundCheckbox: 'Background',
                lineColor: 'Line color',
                lineWidth: 'Line width',
                lineVisibility: 'Wave',
                elliottDegree: 'Degree',
                lineColorPicker: 'Line',
                lineEndType: {
                    arrow: 'Line arrow',
                    none: 'None',
                },
            },
            background: {
                title: 'Background',
                backgroundCheckbox: 'Background',
                borderCheckbox: 'Border',
            },
            borders: {
                top: 'Top border',
                bottom: 'Bottom border',
                left: 'Left border',
                right: 'Right border',
            },
            text: {
                title: 'Text',
            },
            gann: {
                fans: 'Fans',
                price: 'Price',
                time: 'Time',
                levels: 'levels',
                arcs: 'Arcs',
                fullCircles: 'Full Circles',
            },
            labels: {
                title: 'Labels',
                priceCheckbox: 'Price',
                coefficientCheckbox: 'Coefficient',
                sidePlacementSelectboxOptions: {
                    right: 'Right',
                    left: 'Left',
                },
                placementToTheLineSelectboxOptions: {
                    top: 'Top',
                    bottom: 'Bottom',
                    middle: 'Middle',
                },
            },
            measureBox: {
                title: 'Measure Box',
                percentPriceCheckbox: 'Show % price change',
                changeCheckbox: 'Show change',
                showBars: 'Show Bars',
                showDateTime: 'Show Date Time',
                showDistance: 'Show Distance',
                showAngle: 'Show Angle',
                positionTitle: 'Position',
                position: {
                    right: 'Right',
                    center: 'Center',
                    left: 'Left',
                    middle: 'Middle',
                },
            },
            extend: {
                title: 'Extend',
                leftCheckbox: 'To the left',
                rightCheckbox: 'To the right',
            },
            showArrow: {
                title: 'Show Arrow',
                leftEndCheckbox: 'At the left end',
                rightEndCheckbox: 'At the right end',
                startCheckbox: 'At the start of the figure',
                endCheckbox: 'At the end of the figure',
            },
        },
        actions: {
            restore: 'Restore Defaults',
            closeBtn: 'Close',
        },
    },
    textNote: {
        hint: `Enter - jump to next line, Ctrl(Cmd) + Enter - submit form`,
    },
    regressionTrend: {
        deviation: {
            title: 'Deviation',
            up: 'Upper Deviation',
            down: 'Lower Deviation',
            useUpperDeviation: 'Use Upper Deviation',
            useLowerDeviation: 'Use Lower Deviation',
            source: 'Source',
        },
        sections: {
            base: 'Base',
            up: 'Up',
            down: 'Down',
        },
        style: {
            extendLines: 'Extend Lines',
            pearsonR: "Pearson's R",
        },
    },
    fibonacciSpiral: {
        counterclockwiseCheckbox: 'Counterclockwise',
        spiralLength: 'Spiral Length',
    },
};