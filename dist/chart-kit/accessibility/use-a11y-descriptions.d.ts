import { Localization } from '../../config/localization/localization';
import { RefObject } from 'react';
export declare const A11Y_DXSCRIPT_STUDY_DESC_ID = "a11y_dx_script_study_description";
export declare const A11Y_DXSCRIPT_STUDY_LOCKED_DESC_ID = "a11y_dx_script_study_locked_description";
export declare const A11Y_STUDY_DESC_ID = "a11y_study_description";
export declare const A11Y_AGGREGATION_PERIOD_DESC_ID = "a11y_aggregation_period_description";
export declare const A11Y_LAYOUT_TEMPLATE_DESC_ID = "a11y_layout_template_description";
export declare const A11Y_SIMPLE_NUMERIC_STEPPER_DESC_ID = "a11y_simple_numeric_stepper_description";
export declare const A11Y_INDICATOR_TEMPLATE_DESC_ID = "a11y_indicator_template_description";
export declare const A11Y_DRAWINGS_SIDEBAR_BUTTON_DESC_ID = "a11y_drawings_sidebar_button_description";
export declare const A11Y_DESCRIPTION_IDS: readonly ["a11y_dx_script_study_description", "a11y_dx_script_study_locked_description", "a11y_study_description", "a11y_aggregation_period_description", "a11y_layout_template_description", "a11y_simple_numeric_stepper_description", "a11y_indicator_template_description", "a11y_drawings_sidebar_button_description"];
export type A11yDescriptionId = (typeof A11Y_DESCRIPTION_IDS)[number];
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
export declare const useA11yDescriptions: (rootRef: RefObject<HTMLElement>, localization: Localization) => void;
