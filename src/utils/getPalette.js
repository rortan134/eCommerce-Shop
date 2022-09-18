import Vibrant from "node-vibrant";
import { useEffect, useState } from "react";

// Get most vibrant color from any image
// For UI designs

function getPalette(imagesrc) {
    const [palette, setPalette] = useState();

    useEffect(() => {
        if (imagesrc) {
            const getColors = async () => {
                const image = new Image();
                image.crossOrigin = "anonymous";
                image.src = imagesrc;
                const paletteData = await Vibrant.from(imagesrc).getPalette();
                setPalette(paletteData);
            };
            getColors();
        }
    }, [imagesrc]);

    return palette;
}

export default getPalette;
