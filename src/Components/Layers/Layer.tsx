import React, { ReactNode } from "react";

interface LayerProps {
    children: ReactNode;
}

const Layers = (props: LayerProps) => {
    return (
        <div>
            {props.children}
        </div>
    )
};

export default Layers;