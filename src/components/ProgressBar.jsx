import { LinearProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function ProgressBar({ duration, dispatch }) {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef();

    const increaseProgress = () => {
        setProgress((lastProgress) => lastProgress + 1);
    };

    useEffect(() => {
        intervalRef.current = setInterval(increaseProgress, duration);
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setProgress(0);
            dispatch();
        }
    }, [progress]);

    return (
        <>
            <LinearProgress
                variant={"determinate"}
                value={progress}
                color="secondary"
                aria-valuemin="0"
                aria-valuemax="100"
                role="progressbar"
                aria-valuenow={progress}
            />
        </>
    );
}

export default ProgressBar;
