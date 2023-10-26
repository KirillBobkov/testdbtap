export const createCombinedStudiesProvider = (dxScript, dxStudy, dxStudiesProvider, dxScriptProvider) => {
    const calculateStudy = async (config, options) => {
        const studySetting = dxStudiesProvider.getStudies().find(s => s.id === config.id);
        switch (studySetting && studySetting.type) {
            case 'dxScript':
                const script = await dxScriptProvider.getScript(config.id);
                return dxScript.calculateStudy(script?.code ?? '', config);
            case 'dxStudy':
            default:
                return dxStudy.calculateStudy(config, options);
        }
    };
    return { calculateStudy };
};
