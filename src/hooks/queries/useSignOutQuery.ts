import { useQuery } from "react-query";
import { getApiAuthLogout, GetApiAuthLogoutResponse } from "../../api/client";

export const useSignOutQuery = () => (useQuery<GetApiAuthLogoutResponse>(
    {
        queryFn : async () => {
            return getApiAuthLogout({
                tokenType: "Bearer"
            });
        },
        // https://tanstack.com/query/v4/docs/framework/react/guides/disabling-queries
        enabled : false
    }
));