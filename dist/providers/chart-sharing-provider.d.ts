export interface UploadResult {
    readonly url: string;
}
export interface UploadOptions {
    target?: string;
}
/**
 * Provider for snapshot images. Chart will send canvas snapshots and expect URL as result of storing these pictures.
 */
export interface ChartSharingProvider {
    /**
     * Uploads image on server and returns a link to uploaded image
     * @param blob image to share
     * @returns {string} link to the image
     */
    uploadChartSnapshot(blob: Blob, options?: UploadOptions): Promise<UploadResult>;
}
export interface DefaultUploadOptions extends UploadOptions {
    target?: DefaultSharingExternalResources;
}
export type DefaultSharingExternalResources = 'twitter' | 'telegram';
interface ChartSharingProviderProps {
    endpointUrl?: string;
}
export declare function createChartSharingProvider({ endpointUrl, }?: ChartSharingProviderProps): ChartSharingProvider;
export {};
