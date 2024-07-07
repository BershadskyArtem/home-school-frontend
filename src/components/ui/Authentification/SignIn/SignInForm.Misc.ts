const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

export function oauthProviderLink(provider : string, redirectAfter? : string){

    if (!redirectAfter){
        return `${apiUrl}/api/auth/oauth/${provider}`;
    }

    return `${apiUrl}/auth/oauth/${provider}?redirectAfter=${redirectAfter}`;
}

export function oauthGoogleLink(redirectAfter? : string){
    return oauthProviderLink('google', redirectAfter);
}

export function oauthGithubLink(redirectAfter? : string){
    return oauthProviderLink('github', redirectAfter);
}

export function oauthZoomLink(redirectAfter? : string){
    return oauthProviderLink('zoom', redirectAfter);
}