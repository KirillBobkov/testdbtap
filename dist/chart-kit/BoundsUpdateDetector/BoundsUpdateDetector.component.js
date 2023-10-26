import React from 'react';
import ReactDOM from 'react-dom';
export class BoundsUpdateDetector extends React.Component {
    componentDidMount() {
        this.size = this.getSize();
    }
    getSize() {
        // eslint-disable-next-line no-restricted-syntax
        const element = ReactDOM.findDOMNode(this);
        return {
            width: element.offsetWidth,
            height: element.offsetHeight,
        };
    }
    componentDidUpdate(prevProps, prevState) {
        const size = this.getSize();
        const { width, height } = this.size;
        if (height !== size.height || width !== size.width) {
            this.size = size;
            this.props.onUpdate && this.props.onUpdate(size);
        }
    }
    render() {
        return this.props.children;
    }
}
