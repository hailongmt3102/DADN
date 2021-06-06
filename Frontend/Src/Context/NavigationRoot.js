import * as React from 'react'

export const stack_navigation_ref = React.createRef();

export function stack_navigate(name, params){
    stack_navigation_ref.current?.navigate(name, params);
}


// export const drawer_navigation_ref = React.createRef();

// export function navigate_drawer(name, params){
//     drawer_navigation_ref.current?.navigate(name, params);
// }
