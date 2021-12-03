import { useState, useEffect } from "react";

export default function useUserIp() {
    const [userIp, setUserIp] = useState("");

    useEffect(() => {
        const callApi = async () => {
            await fetch("http://api.ipify.org/?format=json")
                .then((response) => response.json())
                .then((data) => {
                    setUserIp(data);
                });
        };
        callApi();
    }, []);

    return userIp;
}
