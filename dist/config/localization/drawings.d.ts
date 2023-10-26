import { DrawingType } from '../../chart/model/drawing.model';
export type OptionalDrawingTypes = 'trend' | 'extended' | 'multichannel' | 'base_isolation_tool' | 'magnifying_tool_rectangle' | 'magnifying_tool_time_range' | 'magnifying_tool_time_range_wheel';
export type DrawingNames = Record<Exclude<DrawingType, OptionalDrawingTypes>, string> & Record<'default', string>;
export declare const drawingsDictionary: {
    recentDrawings: string;
    noRecentDrawings: string;
    hideDrawings: string;
    unhideDrawings: string;
    clearDrawings: string;
    types: DrawingNames;
    dropdown: {
        hideBtn: string;
        clearBtn: string;
        showBtn: string;
    };
    calendar: {
        dayAbb: {
            monday: string;
            tuesday: string;
            wednesday: string;
            thursday: string;
            friday: string;
            saturday: string;
            sunday: string;
        };
        months: {
            january: string;
            february: string;
            march: string;
            april: string;
            may: string;
            june: string;
            july: string;
            august: string;
            september: string;
            october: string;
            november: string;
            december: string;
        };
    };
    colorPicker: {
        titles: {
            title: string;
            sides: string;
            basicAndStudies: string;
            common: string;
        };
    };
    confirmationPopup: {
        title: string;
        confirmationMessage: string;
        cancel: string;
        confirm: string;
    };
    popup: {
        title: DrawingNames;
        sections: {
            default: string;
            coordinates: {
                title: string;
                priceLabel: string;
                timeLabel: string;
                dateLabel: string;
                timeCheckbox: string;
                priceCheckbox: string;
            };
            style: {
                title: string;
                applyToAll: string;
                trendlineColorPicker: string;
                medianColorPicker: string;
                backgroundCheckbox: string;
                lineColor: string;
                lineWidth: string;
                lineVisibility: string;
                elliottDegree: string;
                lineColorPicker: string;
                lineEndType: {
                    arrow: string;
                    none: string;
                };
            };
            background: {
                title: string;
                backgroundCheckbox: string;
                borderCheckbox: string;
            };
            borders: {
                top: string;
                bottom: string;
                left: string;
                right: string;
            };
            text: {
                title: string;
            };
            gann: {
                fans: string;
                price: string;
                time: string;
                levels: string;
                arcs: string;
                fullCircles: string;
            };
            labels: {
                title: string;
                priceCheckbox: string;
                coefficientCheckbox: string;
                sidePlacementSelectboxOptions: {
                    right: string;
                    left: string;
                };
                placementToTheLineSelectboxOptions: {
                    top: string;
                    bottom: string;
                    middle: string;
                };
            };
            measureBox: {
                title: string;
                percentPriceCheckbox: string;
                changeCheckbox: string;
                showBars: string;
                showDateTime: string;
                showDistance: string;
                showAngle: string;
                positionTitle: string;
                position: {
                    right: string;
                    center: string;
                    left: string;
                    middle: string;
                };
            };
            extend: {
                title: string;
                leftCheckbox: string;
                rightCheckbox: string;
            };
            showArrow: {
                title: string;
                leftEndCheckbox: string;
                rightEndCheckbox: string;
                startCheckbox: string;
                endCheckbox: string;
            };
        };
        actions: {
            restore: string;
            closeBtn: string;
        };
    };
    textNote: {
        hint: string;
    };
    regressionTrend: {
        deviation: {
            title: string;
            up: string;
            down: string;
            useUpperDeviation: string;
            useLowerDeviation: string;
            source: string;
        };
        sections: {
            base: string;
            up: string;
            down: string;
        };
        style: {
            extendLines: string;
            pearsonR: string;
        };
    };
    fibonacciSpiral: {
        counterclockwiseCheckbox: string;
        spiralLength: string;
    };
};
export type DrawingsDictionary = typeof drawingsDictionary;
