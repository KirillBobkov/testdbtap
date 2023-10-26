const SNAPSHOT_URL = 'https://webdev.prosp.devexperts.com:8095/api/snapshot';
export function createChartSharingProvider({ endpointUrl = SNAPSHOT_URL, } = {}) {
    const uploadChartSnapshot = (blob, options) => {
        const formData = new FormData();
        formData.append('image', blob);
        return fetch(`${endpointUrl}/`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.text())
            .then(url => {
            if (options && options.target === 'twitter') {
                const urlObj = new URL(url);
                urlObj.port = '8095';
                const forced8095Port = urlObj.toString();
                return { url: forced8095Port };
            }
            return { url };
        });
    };
    return {
        uploadChartSnapshot,
    };
}
