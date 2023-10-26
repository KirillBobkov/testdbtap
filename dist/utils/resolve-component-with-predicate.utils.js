import React from 'react';
export const resolveComponentWithPredicate = (predicate, Component) => {
    return predicate ? Component : () => React.createElement(React.Fragment);
};
