import Color from 'color';
export const colorToAlpha = (color) => Color.rgb(color).alpha() * 100;
export const splitRGBAColor = (color) => {
    const resultOfMatch = color.match(/\((.+)\)/);
    if (resultOfMatch) {
        return resultOfMatch[1].trim().split(/\s*[,/]\s*|\s+/);
    }
    return [];
};
const splitColor = (color) => Color(color).array();
const getRGBAString = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;
export const getNewValidRGBAColor = (color, opacity) => {
    const [r, g, b] = splitColor(color);
    const validOpacity = opacity / 100;
    return getRGBAString(r, g, b, validOpacity);
};
// rgba(122,122,122,0.8) ->  rgba(122,122,122,1)
export const getPureColor = (color) => {
    const parsedColor = Color(color).rgb().toString();
    return getNewValidRGBAColor(parsedColor, 100);
};
export const rgbaToHexColor = (rgba) => Color(rgba).hex();
export const isWhite = (rgba) => rgbaToHexColor(rgba) === '#FFFFFF';
