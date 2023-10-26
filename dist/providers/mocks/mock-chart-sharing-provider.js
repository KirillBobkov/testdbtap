export function createMockChartSharingProvider() {
    const uploadChartSnapshot = (blob) => {
        return new Promise(resolve => resolve({
            url: 'https://www.thecoderpedia.com/wp-content/uploads/2020/06/Coding-Jokes-Studying-Software-Engineering.jpg',
        }));
    };
    return {
        uploadChartSnapshot,
    };
}
