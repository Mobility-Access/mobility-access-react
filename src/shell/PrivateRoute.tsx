import React from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";

import { isExpired } from "react-jwt";

interface PrivateRouteProps extends RouteProps {
    children: React.ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const {children, ...rest} = props;
    const isAuthenticated = () => {
        const jwt = localStorage.getItem("wrmjwt");

        if (!jwt) {
            return false;
        }
        
        return !isExpired(jwt);
    };

    return (
        <Route 
            {...rest}
            render={({location}) => {
                return isAuthenticated()
                    ? props.children
                    : <Redirect to={{
                        pathname: "/reports/login",
                        state: {
                            from: location
                        }}}
                    />
                }
            } 
        />
    );
}

export default PrivateRoute;