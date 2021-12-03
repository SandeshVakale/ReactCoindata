import React from "react";

export const useViewportWidth = () => {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return the width so we can use it in our components
    return { width };
}

export const useViewportHeight = () => {
    const [height, setHeight] = React.useState(window.innerHeight);

    React.useEffect(() => {
        const handleWindowResize = () => setHeight(window.innerHeight);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return the width so we can use it in our components
    return { height };
}
