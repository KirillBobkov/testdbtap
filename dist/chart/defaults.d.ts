/// <reference types="react" />
import { ChartTypesConfig } from './model/chart.model';
import { ChartReactConfig } from '../config/chart-react-config';
/**
 * Default chart types config.
 * @doc-tags chart-react,default-config
 */
export declare const DEFAULT_CHART_TYPES_CONFIG: ChartTypesConfig;
/**
 * Default aggregation period.
 * @doc-tags chart-react,default-config
 */
export declare const DEFAULT_AGGREGATION_PERIOD: import("./model/aggregation.model").AggregationPeriod;
/**
 * Default list of aggregation periods. Will be applied if no user data provided.
 * @doc-tags chart-react,default-config
 */
export declare const DEFAULT_AGGREGATION_PERIODS_LIST: import("./model/aggregation.model").AggregationPeriod[];
/**
 * Default chart react palette object.
 * @doc-tags chart-react,default-config
 */
export declare const DEFAULT_PALETTE: {
    light: {
        object: {
            'button-border-bg': string;
            'button-buy-default-bg': string;
            'button-buy-default-color': string;
            'button-buy-hovered-bg': string;
            'button-focus-border': string;
            'button-primary-border-default': string;
            'button-primary-default': string;
            'button-primary-default-text': string;
            'button-primary-disabled-text': string;
            'button-primary-draggable': string;
            'button-primary-hover': string;
            'button-primary-pressed': string;
            'button-secondary-border-default': string;
            'button-secondary-border-disabled': string;
            'button-secondary-border-hover': string;
            'button-secondary-border-pressed': string;
            'button-secondary-default': string;
            'button-secondary-default-text': string;
            'button-secondary-disabled-text': string;
            'button-secondary-hover': string;
            'button-secondary-pressed': string;
            'button-sell-default-bg': string;
            'button-sell-default-color': string;
            'button-sell-hovered-bg': string;
            'button-tertiary-border-default': string;
            'button-tertiary-default': string;
            'button-tertiary-hover': string;
            'button-tertiaty-default-text': string;
            'button-tertiaty-pressed': string;
            'buy-hover-bg': string;
            'checkbox-border-default': string;
            'checkbox-border-disabled': string;
            'checkbox-border-hover': string;
            'checkbox-border-pressed': string;
            'checkbox-default-text': string;
            'checkbox-disabled-text': string;
            'color_palette-picker': string;
            'color_palette-set_eight-1': string;
            'color_palette-set_eight-2': string;
            'color_palette-set_eight-3': string;
            'color_palette-set_eight-4': string;
            'color_palette-set_eleven-1': string;
            'color_palette-set_eleven-2': string;
            'color_palette-set_eleven-3': string;
            'color_palette-set_eleven-4': string;
            'color_palette-set_five-1': string;
            'color_palette-set_five-2': string;
            'color_palette-set_five-3': string;
            'color_palette-set_five-4': string;
            'color_palette-set_four-1': string;
            'color_palette-set_four-2': string;
            'color_palette-set_four-3': string;
            'color_palette-set_four-4': string;
            'color_palette-set_nine-1': string;
            'color_palette-set_nine-2': string;
            'color_palette-set_nine-3': string;
            'color_palette-set_nine-4': string;
            'color_palette-set_one-1': string;
            'color_palette-set_one-2': string;
            'color_palette-set_one-3': string;
            'color_palette-set_one-4': string;
            'color_palette-set_seven-1': string;
            'color_palette-set_seven-2': string;
            'color_palette-set_seven-3': string;
            'color_palette-set_seven-4': string;
            'color_palette-set_six-1': string;
            'color_palette-set_six-2': string;
            'color_palette-set_six-3': string;
            'color_palette-set_six-4': string;
            'color_palette-set_ten-1': string;
            'color_palette-set_ten-2': string;
            'color_palette-set_ten-3': string;
            'color_palette-set_ten-4': string;
            'color_palette-set_three-1': string;
            'color_palette-set_three-2': string;
            'color_palette-set_three-3': string;
            'color_palette-set_three-4': string;
            'color_palette-set_twelve-1': string;
            'color_palette-set_twelve-2': string;
            'color_palette-set_twelve-3': string;
            'color_palette-set_twelve-4': string;
            'color_palette-set_two-1': string;
            'color_palette-set_two-2': string;
            'color_palette-set_two-3': string;
            'color_palette-set_two-4': string;
            'databox-bg': string;
            'databox-text-default': string;
            'databox-text-disabled': string;
            'databox-time-hover': string;
            'dragging_area-bg': string;
            'dragging_slider-border-default-bg': string;
            'dragging_slider-border-hovered-bg': string;
            'dragging_slider-default-bg': string;
            'dragging_slider-hovered-bg': string;
            'drawing-default-bg': string;
            'drawing-handle_border-bg': string;
            'drawing-handle-default-bg': string;
            'drawing-handle-hover-bg': string;
            'drawing-handle-negative-bg': string;
            'drawing-handle-positive-bg': string;
            'drawing-highlight_border-default-bg': string;
            'drawing-highlight-default-bg': string;
            'drawing-icon_border-bg': string;
            'drawing-line-default-bg': string;
            'drawing-line-negative-bg': string;
            'drawing-line-positive-bg': string;
            'drawing-negative-bg': string;
            'drawing-positive-bg': string;
            'drawing-tag-default-bg': string;
            'drawing-text-bg': string;
            'drawing-text-border': string;
            'drawing-text-default': string;
            'dropdown_secondary-bg': string;
            'dropdown_secondary-list_item_hovered-bg': string;
            'dropdown-default-bg': string;
            'dropdown-default-border': string;
            'dropdown-description-text': string;
            'dropdown-hovered-bg': string;
            'dropdown-list_item-default-text': string;
            'dropdown-list_item-disabled-text': string;
            'dropdown-list_item-divider-bg': string;
            'dropdown-list_item-hovered-bg': string;
            'dropdown-list_item-selected-text': string;
            'dropdown-selector-hovered-bg': string;
            'events-call-bg': string;
            'events-dividends-bg': string;
            'events-earnings-bg': string;
            'events-news-bg': string;
            'events-splits-bg': string;
            'form-subtitle-text': string;
            'form-title-text': string;
            'icon-active-bg': string;
            'icon-active-disabled-default-bg': string;
            'icon-disabled-default-bg': string;
            'icon-hovered-bg': string;
            'icon-pressed-bg': string;
            'icon-primary-default-bg': string;
            'icon-secondary-default-bg': string;
            'input-default-bg': string;
            'input-default-border': string;
            'input-default-text': string;
            'input-disabled-text': string;
            'input-focused-border': string;
            'input-hovered-border': string;
            'link-default-text': string;
            'link-hovered-bg': string;
            'link-hovered-text': string;
            'main_chart-area': string;
            'main_chart-area-grad_1': string;
            'main_chart-area-grad_2': string;
            'main_chart-bear_bar-bottom-bg': string;
            'main_chart-bear_bar-cap-bg': string;
            'main_chart-bear_bar-top-bg': string;
            'main_chart-bg': string;
            'main_chart-border-active': string;
            'main_chart-bull_bar-bottom-bg': string;
            'main_chart-bull_bar-cap-bg': string;
            'main_chart-bull_bar-top-bg': string;
            'main_chart-candle-bear-body-active-bg': string;
            'main_chart-candle-bear-body-bg': string;
            'main_chart-candle-bear-wick-active-bg': string;
            'main_chart-candle-bear-wick-bg': string;
            'main_chart-candle-bull-body-active-bg': string;
            'main_chart-candle-bull-body-bg': string;
            'main_chart-candle-bull-wick-active-bg': string;
            'main_chart-candle-bull-wick-bg': string;
            'main_chart-candle-doji-body-active-bg': string;
            'main_chart-candle-doji-body-bg': string;
            'main_chart-candle-doji-wick-active-bg': string;
            'main_chart-candle-doji-wick-bg': string;
            'main_chart-compare-plot_color-1': string;
            'main_chart-compare-plot_color-1-grad_1': string;
            'main_chart-compare-plot_color-1-grad_2': string;
            'main_chart-compare-plot_color-2': string;
            'main_chart-compare-plot_color-2-grad_1': string;
            'main_chart-compare-plot_color-2-grad_2': string;
            'main_chart-compare-plot_color-3': string;
            'main_chart-compare-plot_color-3-grad_1': string;
            'main_chart-compare-plot_color-3-grad_2': string;
            'main_chart-compare-plot_color-4': string;
            'main_chart-compare-plot_color-4-grad_1': string;
            'main_chart-compare-plot_color-4-grad_2': string;
            'main_chart-compare-plot_color-5': string;
            'main_chart-compare-plot_color-5-grad_1': string;
            'main_chart-compare-plot_color-5-grad_2': string;
            'main_chart-compare-plot_color-6': string;
            'main_chart-compare-plot_color-6-grad_1': string;
            'main_chart-compare-plot_color-6-grad_2': string;
            'main_chart-crosshair-label-bg': string;
            'main_chart-crosshair-tag-inverted-text': string;
            'main_chart-crosshair-tag-text': string;
            'main_chart-databox-bg': string;
            'main_chart-databox-border': string;
            'main_chart-divider-default-bg': string;
            'main_chart-divider-hover-bg': string;
            'main_chart-doji_bar-bottom-bg': string;
            'main_chart-doji_bar-cap-bg': string;
            'main_chart-doji_bar-top-bg': string;
            'main_chart-grid-dot': string;
            'main_chart-grid-line': string;
            'main_chart-high-low-indicator': string;
            'main_chart-label-inverted-text': string;
            'main_chart-label-text': string;
            'main_chart-loading-text': string;
            'main_chart-post_market_data-bg': string;
            'main_chart-post_market_data-label': string;
            'main_chart-post_market_data-line': string;
            'main_chart-pre_market_data-bg': string;
            'main_chart-pre_market_data-label': string;
            'main_chart-pre_market_data-line': string;
            'main_chart-progress_bar_bg': string;
            'main_chart-resize_bar-default-bg': string;
            'main_chart-resize_bar-hover-bg': string;
            'main_chart-scale-full-bg': string;
            'main_chart-scale-handle-bg': string;
            'main_chart-scale-visible-bg': string;
            'main_chart-scatter-default-bg': string;
            'main_chart-session_break-bg': string;
            'main_chart-value-text': string;
            'main_chart-value-text-border': string;
            'main_chart-volume_bar-buy': string;
            'main_chart-volume_bar-sell': string;
            'main_chart-volume_top-bg': string;
            'main_chart-volume_top-buy': string;
            'main_chart-volume_top-sell': string;
            'main_chart-volume-bg': string;
            'main_chart-watermark-text': string;
            'main_chart-zero_percent-line-bg': string;
            'mini_toolbar-default-bg': string;
            'modal_window-border': string;
            'modal_window-header-bg': string;
            'order_entry-border-bg': string;
            'order-border-default-bg': string;
            'order-border-hover-bg': string;
            'order-border-selected-bg': string;
            'order-button-default-bg': string;
            'order-button-hover-bg': string;
            'order-close_button-default-bg': string;
            'order-close_button-hover-bg': string;
            'order-default-bg': string;
            'order-divider-default-bg': string;
            'order-divider-selected-bg': string;
            'order-selected-bg': string;
            'order-wick-default-bg': string;
            'order-wick-hover-bg': string;
            'palette-color-border': string;
            'position_negative-default-bg': string;
            'position_negative-divider-bg': string;
            'position_negative-wick-bg': string;
            'position_positive-default-bg': string;
            'position_positive-divider-bg': string;
            'position_positive-wick-bg': string;
            'position-icon-default-bg': string;
            'radiobutton-default-bg': string;
            'radiobutton-default-dot': string;
            'radiobutton-disabled-dot': string;
            'radiobutton-hover-bg': string;
            scrollbar: string;
            'selector-active-bg': string;
            'selector-default-bg': string;
            'selector-hover-bg': string;
            'sell-hover-bg': string;
            'slider-bg': string;
            'stepper-default-bg': string;
            'stepper-default-border': string;
            'switcher-active_hovered-bg': string;
            'switcher-active-bg': string;
            'switcher-default-bg': string;
            'switcher-hovered-bg': string;
            'switcher-toggle-default-bg': string;
            'text-selection-bg': string;
            'toolbar-button-default-color': string;
            'toolbar-button-default-hover-bg': string;
        };
        css: string;
    };
    dark: {
        object: {
            'button-border-bg': string;
            'button-buy-default-bg': string;
            'button-buy-default-color': string;
            'button-buy-hovered-bg': string;
            'button-focus-border': string;
            'button-primary-border-default': string;
            'button-primary-default': string;
            'button-primary-default-text': string;
            'button-primary-disabled-text': string;
            'button-primary-draggable': string;
            'button-primary-hover': string;
            'button-primary-pressed': string;
            'button-secondary-border-default': string;
            'button-secondary-border-disabled': string;
            'button-secondary-border-hover': string;
            'button-secondary-border-pressed': string;
            'button-secondary-default': string;
            'button-secondary-default-text': string;
            'button-secondary-disabled-text': string;
            'button-secondary-hover': string;
            'button-secondary-pressed': string;
            'button-sell-default-bg': string;
            'button-sell-default-color': string;
            'button-sell-hovered-bg': string;
            'button-tertiary-border-default': string;
            'button-tertiary-default': string;
            'button-tertiary-hover': string;
            'button-tertiaty-default-text': string;
            'button-tertiaty-disabled-text': string;
            'button-tertiaty-pressed': string;
            'buy-hover-bg': string;
            'checkbox-border-default': string;
            'checkbox-border-disabled': string;
            'checkbox-border-hover': string;
            'checkbox-border-pressed': string;
            'checkbox-default-text': string;
            'checkbox-disabled-text': string;
            'color_palette-picker': string;
            'color_palette-set_eight-1': string;
            'color_palette-set_eight-2': string;
            'color_palette-set_eight-3': string;
            'color_palette-set_eight-4': string;
            'color_palette-set_eleven-1': string;
            'color_palette-set_eleven-2': string;
            'color_palette-set_eleven-3': string;
            'color_palette-set_eleven-4': string;
            'color_palette-set_five-1': string;
            'color_palette-set_five-2': string;
            'color_palette-set_five-3': string;
            'color_palette-set_five-4': string;
            'color_palette-set_four-1': string;
            'color_palette-set_four-2': string;
            'color_palette-set_four-3': string;
            'color_palette-set_four-4': string;
            'color_palette-set_nine-1': string;
            'color_palette-set_nine-2': string;
            'color_palette-set_nine-3': string;
            'color_palette-set_nine-4': string;
            'color_palette-set_one-1': string;
            'color_palette-set_one-2': string;
            'color_palette-set_one-3': string;
            'color_palette-set_one-4': string;
            'color_palette-set_seven-1': string;
            'color_palette-set_seven-2': string;
            'color_palette-set_seven-3': string;
            'color_palette-set_seven-4': string;
            'color_palette-set_six-1': string;
            'color_palette-set_six-2': string;
            'color_palette-set_six-3': string;
            'color_palette-set_six-4': string;
            'color_palette-set_ten-1': string;
            'color_palette-set_ten-2': string;
            'color_palette-set_ten-3': string;
            'color_palette-set_ten-4': string;
            'color_palette-set_three-1': string;
            'color_palette-set_three-2': string;
            'color_palette-set_three-3': string;
            'color_palette-set_three-4': string;
            'color_palette-set_twelve-1': string;
            'color_palette-set_twelve-2': string;
            'color_palette-set_twelve-3': string;
            'color_palette-set_twelve-4': string;
            'color_palette-set_two-1': string;
            'color_palette-set_two-2': string;
            'color_palette-set_two-3': string;
            'color_palette-set_two-4': string;
            'databox-bg': string;
            'databox-text-default': string;
            'databox-text-disabled': string;
            'databox-time-hover': string;
            'dragging_area-bg': string;
            'dragging_slider-border-default-bg': string;
            'dragging_slider-border-hovered-bg': string;
            'dragging_slider-default-bg': string;
            'dragging_slider-hovered-bg': string;
            'drawing-default-bg': string;
            'drawing-handle_border-bg': string;
            'drawing-handle-default-bg': string;
            'drawing-handle-hover-bg': string;
            'drawing-handle-negative-bg': string;
            'drawing-handle-positive-bg': string;
            'drawing-highlight_border-default-bg': string;
            'drawing-highlight-default-bg': string;
            'drawing-icon_border-bg': string;
            'drawing-line-default-bg': string;
            'drawing-line-negative-bg': string;
            'drawing-line-positive-bg': string;
            'drawing-negative-bg': string;
            'drawing-positive-bg': string;
            'drawing-tag-default-bg': string;
            'drawing-text-bg': string;
            'drawing-text-border': string;
            'drawing-text-default': string;
            'dropdown_secondary-bg': string;
            'dropdown_secondary-list_item_hovered-bg': string;
            'dropdown-default-bg': string;
            'dropdown-default-border': string;
            'dropdown-description-text': string;
            'dropdown-hovered-bg': string;
            'dropdown-list_item-default-text': string;
            'dropdown-list_item-disabled-text': string;
            'dropdown-list_item-divider-bg': string;
            'dropdown-list_item-hovered-bg': string;
            'dropdown-list_item-selected-text': string;
            'dropdown-selector-default-bg': string;
            'dropdown-selector-hovered-bg': string;
            'events-call-bg': string;
            'events-dividends-bg': string;
            'events-earnings-bg': string;
            'events-news-bg': string;
            'events-splits-bg': string;
            'form-subtitle-text': string;
            'form-title-text': string;
            'icon-active-bg': string;
            'icon-active-disabled-default-bg': string;
            'icon-disabled-default-bg': string;
            'icon-hovered-bg': string;
            'icon-pressed-bg': string;
            'icon-primary-default-bg': string;
            'icon-secondary-default-bg': string;
            'input-default-bg': string;
            'input-default-border': string;
            'input-default-text': string;
            'input-disabled-text': string;
            'input-focused-border': string;
            'input-hovered-border': string;
            'link-default-text': string;
            'link-hovered-bg': string;
            'link-hovered-text': string;
            'm-button-primary-default': string;
            'm-button-primary-pressed': string;
            'm-color_picker-border': string;
            'm-dropdown-default-bg': string;
            'm-icon-disabled': string;
            'm-input_border-default-bg': string;
            'm-main_chart-bg': string;
            'm-main_chart-crosshair_line-bg': string;
            'm-main_chart-crosshair-bg': string;
            'm-main_chart-databox-bg': string;
            'm-main_chart-grid-line': string;
            'm-main_chart-indicator_name-bg': string;
            'm-main_chart-value-border': string;
            'm-separator': string;
            'main_chart-area': string;
            'main_chart-area-grad_1': string;
            'main_chart-area-grad_2': string;
            'main_chart-bear_bar-bottom-bg': string;
            'main_chart-bear_bar-cap-bg': string;
            'main_chart-bear_bar-top-bg': string;
            'main_chart-bg': string;
            'main_chart-border-active': string;
            'main_chart-bull_bar-bottom-bg': string;
            'main_chart-bull_bar-cap-bg': string;
            'main_chart-bull_bar-top-bg': string;
            'main_chart-candle-bear-body-active-bg': string;
            'main_chart-candle-bear-body-bg': string;
            'main_chart-candle-bear-wick-active-bg': string;
            'main_chart-candle-bear-wick-bg': string;
            'main_chart-candle-bull-body-active-bg': string;
            'main_chart-candle-bull-body-bg': string;
            'main_chart-candle-bull-wick-active-bg': string;
            'main_chart-candle-bull-wick-bg': string;
            'main_chart-candle-doji-body-active-bg': string;
            'main_chart-candle-doji-body-bg': string;
            'main_chart-candle-doji-wick-active-bg': string;
            'main_chart-candle-doji-wick-bg': string;
            'main_chart-compare-plot_color-1': string;
            'main_chart-compare-plot_color-1-grad_1': string;
            'main_chart-compare-plot_color-1-grad_2': string;
            'main_chart-compare-plot_color-2': string;
            'main_chart-compare-plot_color-2-grad_1': string;
            'main_chart-compare-plot_color-2-grad_2': string;
            'main_chart-compare-plot_color-3': string;
            'main_chart-compare-plot_color-3-grad_1': string;
            'main_chart-compare-plot_color-3-grad_2': string;
            'main_chart-compare-plot_color-4': string;
            'main_chart-compare-plot_color-4-grad_1': string;
            'main_chart-compare-plot_color-4-grad_2': string;
            'main_chart-compare-plot_color-5': string;
            'main_chart-compare-plot_color-5-grad_1': string;
            'main_chart-compare-plot_color-5-grad_2': string;
            'main_chart-compare-plot_color-6': string;
            'main_chart-compare-plot_color-6-grad_1': string;
            'main_chart-compare-plot_color-6-grad_2': string;
            'main_chart-crosshair-label-bg': string;
            'main_chart-crosshair-tag-inverted-text': string;
            'main_chart-crosshair-tag-text': string;
            'main_chart-databox-bg': string;
            'main_chart-databox-border': string;
            'main_chart-divider-default-bg': string;
            'main_chart-divider-hover-bg': string;
            'main_chart-doji_bar-bottom-bg': string;
            'main_chart-doji_bar-cap-bg': string;
            'main_chart-doji_bar-top-bg': string;
            'main_chart-grid-dot': string;
            'main_chart-grid-line': string;
            'main_chart-high-low-indicator': string;
            'main_chart-label-inverted-text': string;
            'main_chart-label-text': string;
            'main_chart-loading-text': string;
            'main_chart-post_market_data-bg': string;
            'main_chart-post_market_data-label': string;
            'main_chart-post_market_data-line': string;
            'main_chart-pre_market_data-bg': string;
            'main_chart-pre_market_data-label': string;
            'main_chart-pre_market_data-line': string;
            'main_chart-progress_bar_bg': string;
            'main_chart-resize_bar-default-bg': string;
            'main_chart-resize_bar-hover-bg': string;
            'main_chart-scale-full-bg': string;
            'main_chart-scale-handle-bg': string;
            'main_chart-scale-visible-bg': string;
            'main_chart-scatter-default-bg': string;
            'main_chart-session_break-bg': string;
            'main_chart-value-text': string;
            'main_chart-value-text-border': string;
            'main_chart-volume_bar-buy': string;
            'main_chart-volume_bar-sell': string;
            'main_chart-volume_top-bg': string;
            'main_chart-volume_top-buy': string;
            'main_chart-volume_top-sell': string;
            'main_chart-volume-bg': string;
            'main_chart-watermark-text': string;
            'main_chart-zero_percent-line-bg': string;
            'mini_toolbar-default-bg': string;
            'modal_window-border': string;
            'modal_window-header-bg': string;
            'order_entry-border-bg': string;
            'order-border-default-bg': string;
            'order-border-hover-bg': string;
            'order-border-selected-bg': string;
            'order-button-default-bg': string;
            'order-button-hover-bg': string;
            'order-close_button-default-bg': string;
            'order-close_button-hover-bg': string;
            'order-default-bg': string;
            'order-divider-default-bg': string;
            'order-divider-selected-bg': string;
            'order-selected-bg': string;
            'order-wick-default-bg': string;
            'order-wick-hover-bg': string;
            'palette-color-border': string;
            'popover-bg': string;
            'popover-list_item-hover-bg': string;
            'position_negative-default-bg': string;
            'position_negative-divider-bg': string;
            'position_negative-wick-bg': string;
            'position_positive-default-bg': string;
            'position_positive-divider-bg': string;
            'position_positive-wick-bg': string;
            'position-icon-default-bg': string;
            'radiobutton-default-bg': string;
            'radiobutton-default-dot': string;
            'radiobutton-disabled-dot': string;
            'radiobutton-hover-bg': string;
            scrollbar: string;
            'selector-active-bg': string;
            'selector-default-bg': string;
            'selector-hover-bg': string;
            'sell-hover-bg': string;
            'slider-bg': string;
            'stepper-default-bg': string;
            'stepper-default-border': string;
            'switcher-active_hovered-bg': string;
            'switcher-active-bg': string;
            'switcher-default-bg': string;
            'switcher-hovered-bg': string;
            'switcher-toggle-default-bg': string;
            'text-selection-bg': string;
            'toolbar-button-default-color': string;
            'toolbar-button-default-hover-bg': string;
        };
        css: string;
    };
};
/**
 * Default theme.
 * @doc-tags chart-react,default-config
 */
export declare const DEFAULT_THEME = "dark";
export interface ChartReactContext {
    rootElement: HTMLDivElement;
    showPopupsOutside: boolean;
    showButtonsTooltip: boolean;
    isMobile: boolean;
    config: ChartReactConfig;
}
export declare const ChartReactAppContext: import("react").Context<ChartReactContext>;
