import { useEffect, useState } from "react";

export default function useUserIp() {
    const [userIp, setUserIp] = useState("");

    useEffect(() => {
        const callApi = async () => {
            await fetch("https://api.ipify.org/?format=json")
                .then((response) => response.json())
                .then((data) => {
                    setUserIp(data);
                });
        };
        callApi();
    }, []);

    return userIp;
}
