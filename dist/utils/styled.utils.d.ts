/**
 * Use in SC to render styles based on condition.
 * @param condition
 * @doc-tags utility,styling
 */
export declare const ifStyle: (condition?: boolean) => import("fp-ts/function").Lazy<string> | import("styled-components").ThemedCssFunction<import("styled-components").DefaultTheme>;
