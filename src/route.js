import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const route = [
    { path: '/signup', exact: true, name: 'Signup', component: SignUp1 },
    { path: '/signin', exact: true, name: 'Signin', component: Signin1 }
];

export default route;