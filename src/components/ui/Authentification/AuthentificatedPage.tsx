import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../hooks/stores/useUserStore";
import { useEffect } from "react";

interface AuthentificatedPageProps {
    children : React.ReactNode;
}

export default function AuthentificatedPage({children} : AuthentificatedPageProps) {
    const user = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // replace replaces browser history

        if (user.is_authentificated){
            return;
        }

        const data = {
            redirectAfter : location.pathname
        }

        const params = new URLSearchParams(data);

        navigate(`/signin?${params.toString()}`, {replace: true})
    }, [user, navigate, location]);

    return children;
}
