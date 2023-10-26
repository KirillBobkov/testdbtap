import { useMemo, useEffect } from 'react';
import { collect } from 'fp-ts/Record';
import { Ord } from 'fp-ts/string';
import { pipe } from 'fp-ts/function';
export const A11Y_DXSCRIPT_STUDY_DESC_ID = 'a11y_dx_script_study_description';
export const A11Y_DXSCRIPT_STUDY_LOCKED_DESC_ID = 'a11y_dx_script_study_locked_description';
export const A11Y_STUDY_DESC_ID = 'a11y_study_description';
export const A11Y_AGGREGATION_PERIOD_DESC_ID = 'a11y_aggregation_period_description';
export const A11Y_LAYOUT_TEMPLATE_DESC_ID = 'a11y_layout_template_description';
export const A11Y_SIMPLE_NUMERIC_STEPPER_DESC_ID = 'a11y_simple_numeric_stepper_description';
export const A11Y_INDICATOR_TEMPLATE_DESC_ID = 'a11y_indicator_template_description';
export const A11Y_DRAWINGS_SIDEBAR_BUTTON_DESC_ID = 'a11y_drawings_sidebar_button_description';
export const A11Y_DESCRIPTION_IDS = [
    A11Y_DXSCRIPT_STUDY_DESC_ID,
    A11Y_DXSCRIPT_STUDY_LOCKED_DESC_ID,
    A11Y_STUDY_DESC_ID,
    A11Y_AGGREGATION_PERIOD_DESC_ID,
    A11Y_LAYOUT_TEMPLATE_DESC_ID,
    A11Y_SIMPLE_NUMERIC_STEPPER_DESC_ID,
    A11Y_INDICATOR_TEMPLATE_DESC_ID,
    A11Y_DRAWINGS_SIDEBAR_BUTTON_DESC_ID,
];
/**
 * Hook is used to create a hidden span elements that contain descriptions of an
 * aria elements with aria-describedby attributes
 *
 * this is the common technique to maintain elements with aria-describedby attributes
 * The main idea is to create an element with a specific <id> somewhere in the DOM, write
 * the description inside, and link it to a desired element with aria-describedby="<id>"
 * @param rootRef ref to the element which hidden description elements should be appened to
 * @param localization dictionary
 * @doc-tags a11y
 */
export const useA11yDescriptions = (rootRef, localization) => {
    // to create a new hidden description element just add a new <id> to the Record with associated localization
    const descritionsMap = useMemo(() => ({
        [A11Y_DXSCRIPT_STUDY_DESC_ID]: localization.studiesPopup.a11y_labelForEditAndDelScript,
        [A11Y_DXSCRIPT_STUDY_LOCKED_DESC_ID]: localization.studiesPopup.a11y_labelForEditScript,
        [A11Y_STUDY_DESC_ID]: localization.studiesPopup.a11y_dragHandleInstructions,
        [A11Y_AGGREGATION_PERIOD_DESC_ID]: localization.aggregationPeriod.a11y_aggregationPeriodDescription,
        [A11Y_LAYOUT_TEMPLATE_DESC_ID]: localization.layout.a11y_layoutTemplateDescription,
        [A11Y_SIMPLE_NUMERIC_STEPPER_DESC_ID]: localization.components.simpleNumericStepper.a11y_component_description,
        [A11Y_INDICATOR_TEMPLATE_DESC_ID]: localization.indicatorTemplates.a11y_indicatorTemplateDescription,
        [A11Y_DRAWINGS_SIDEBAR_BUTTON_DESC_ID]: localization.sidebar.a11y_sidebarButtonDescription,
    }), 
    // calculated only once
    // eslint-disable-next-line
    []);
    const descriptionsArray = useMemo(() => pipe(descritionsMap, collect(Ord)((id, localization) => ({ id, localization }))), 
    // calculated only once
    // eslint-disable-next-line
    []);
    useEffect(() => {
        if (rootRef.current) {
            const containerEl = document.createElement('div');
            containerEl.setAttribute('id', 'a11y_descriptions_container');
            rootRef.current.appendChild(containerEl);
            descriptionsArray.forEach(description => {
                const el = document.createElement('span');
                el.style.display = 'none';
                el.setAttribute('id', description.id);
                el.innerText = description.localization;
                containerEl.appendChild(el);
            });
        }
        // elements should be created only once
        // eslint-disable-next-line
    }, []);
};
