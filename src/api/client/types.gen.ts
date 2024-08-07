// This file is auto-generated by @hey-api/openapi-ts

export type CreateReportRequest = {
    text?: string | null;
    severity?: ReportSeverity;
    target_id?: string | null;
};

export type Error = {
    readonly code?: string | null;
    readonly description?: string | null;
    type?: ErrorType;
    readonly numericType?: number;
    readonly metadata?: {
        [key: string]: unknown;
    } | null;
};

export type ErrorType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type GenerateTokenResult = {
    readonly isSuccess?: boolean;
    access_token?: string | null;
    refresh_token?: string | null;
    expires?: string;
    lifetime?: number;
    type?: string | null;
    message?: string | null;
};

export type GetMeResponse = {
    sub?: string | null;
    username?: string | null;
    email?: string | null;
    is_confirmed?: boolean;
    role?: string | null;
    avatar_url?: string | null;
    token_type?: string | null;
};

export type GetReportResponse = {
    id?: string;
    created_at?: string;
    text?: string | null;
    severity?: ReportSeverity;
    author_id?: string | null;
    is_resolved?: boolean;
    resolved_at?: string | null;
    resolve_message?: string | null;
    resolved_by?: string | null;
    target_id?: string | null;
};

export type LinkAccountRequest = {
    provider?: string | null;
    redirect_after?: string | null;
};

export type LoginRequest = {
    email?: string | null;
    password?: string | null;
};

export type RegisterRequest = {
    email?: string | null;
    password?: string | null;
};

export type ReportSeverity = 1 | 2 | 3 | 4 | 5;

export type SendConfirmationEmailRequest = {
    email?: string | null;
};

export type SendMagicLinkRequest = {
    email?: string | null;
};

export type SendMagicLinkResponse = {
    isSuccess?: boolean;
    message?: string | null;
};

export type Severity = 0 | 1 | 2;

export type UpdateReportRequest = {
    resolve?: boolean;
    resolveMessage?: string | null;
    sendNotification?: boolean;
};

export type ValidationFailure = {
    propertyName?: string | null;
    errorMessage?: string | null;
    attemptedValue?: unknown;
    customState?: unknown;
    severity?: Severity;
    errorCode?: string | null;
    formattedMessagePlaceholderValues?: {
        [key: string]: unknown;
    } | null;
};

export type PostApiAuthLinkData = {
    requestBody: LinkAccountRequest;
};

export type PostApiAuthLinkResponse = unknown;

export type DeleteApiAuthLinkData = {
    requestBody: LinkAccountRequest;
};

export type DeleteApiAuthLinkResponse = unknown;

export type GetApiAuthMagicData = {
    code: string;
};

export type GetApiAuthMagicResponse = GenerateTokenResult;

export type PostApiAuthMagicData = {
    requestBody: SendMagicLinkRequest;
};

export type PostApiAuthMagicResponse = SendMagicLinkResponse;

export type GetApiAuthOauthByProviderData = {
    provider: string;
    redirectAfter?: string;
};

export type GetApiAuthOauthByProviderResponse = unknown;

export type GetApiAuthOauthCallbackByProviderData = {
    code: string;
    provider: string;
    state: string;
};

export type PostApiAuthPasswordRegisterData = {
    requestBody: RegisterRequest;
};

export type PostApiAuthPasswordRegisterResponse = unknown;

export type PostApiAuthPasswordConfirmData = {
    requestBody: SendConfirmationEmailRequest;
};

export type PostApiAuthPasswordConfirmResponse = unknown;

export type GetApiAuthPasswordConfirmData = {
    token: string;
};

export type GetApiAuthPasswordConfirmResponse = GenerateTokenResult;

export type PostApiAuthLoginData = {
    requestBody: LoginRequest;
};

export type PostApiAuthLoginResponse = GenerateTokenResult;

export type GetApiReportsByIdData = {
    id: string;
};

export type GetApiReportsByIdResponse = GetReportResponse;

export type DeleteApiReportsByIdData = {
    id: string;
};

export type DeleteApiReportsByIdResponse = void;

export type PatchApiReportsByIdData = {
    id: string;
    requestBody: UpdateReportRequest;
};

export type PatchApiReportsByIdResponse = unknown;

export type GetApiReportsData = {
    authorId?: string;
    finish?: string;
    isResolved?: boolean;
    maximumSeverity?: string;
    minimumSeverity?: string;
    pageNumber: number;
    pageSize: number;
    resolvedBy?: string;
    start?: string;
    targetId?: string;
};

export type GetApiReportsResponse = Array<GetReportResponse>;

export type PostApiReportsData = {
    requestBody: CreateReportRequest;
};

export type PostApiReportsResponse = unknown;

export type GetApiAuthLogoutData = {
    tokenType: string;
};

export type GetApiAuthLogoutResponse = unknown;

export type PostApiAuthTokenData = {
    grantType: string;
};

export type PostApiAuthTokenResponse = GenerateTokenResult;

export type GetApiAuthTokenIntrospectResponse = GetMeResponse;

export type $OpenApiTs = {
    '/api/auth/link': {
        post: {
            req: PostApiAuthLinkData;
            res: {
                /**
                 * OK
                 */
                200: unknown;
                /**
                 * Bad Request
                 */
                400: unknown;
                /**
                 * Not Found
                 */
                404: unknown;
            };
        };
        delete: {
            req: DeleteApiAuthLinkData;
            res: {
                /**
                 * OK
                 */
                200: unknown;
                /**
                 * Bad Request
                 */
                400: unknown;
                /**
                 * Not Found
                 */
                404: unknown;
            };
        };
    };
    '/api/auth/magic': {
        get: {
            req: GetApiAuthMagicData;
            res: {
                /**
                 * OK
                 */
                200: GenerateTokenResult;
                /**
                 * Bad Request
                 */
                400: GenerateTokenResult;
            };
        };
        post: {
            req: PostApiAuthMagicData;
            res: {
                /**
                 * OK
                 */
                200: SendMagicLinkResponse;
                /**
                 * Bad Request
                 */
                400: Array<ValidationFailure>;
            };
        };
    };
    '/api/auth/oauth/{provider}': {
        get: {
            req: GetApiAuthOauthByProviderData;
            res: {
                /**
                 * OK
                 */
                200: unknown;
            };
        };
    };
    '/api/auth/oauth/callback/{provider}': {
        get: {
            req: GetApiAuthOauthCallbackByProviderData;
            res: {
                /**
                 * Bad Request
                 */
                400: string;
            };
        };
    };
    '/api/auth/password/register': {
        post: {
            req: PostApiAuthPasswordRegisterData;
            res: {
                /**
                 * OK
                 */
                200: unknown;
                /**
                 * Bad Request
                 */
                400: Array<ValidationFailure>;
            };
        };
    };
    '/api/auth/password/confirm': {
        post: {
            req: PostApiAuthPasswordConfirmData;
            res: {
                /**
                 * OK
                 */
                200: unknown;
                /**
                 * Bad Request
                 */
                400: Array<ValidationFailure>;
            };
        };
        get: {
            req: GetApiAuthPasswordConfirmData;
            res: {
                /**
                 * OK
                 */
                200: GenerateTokenResult;
                /**
                 * Bad Request
                 */
                400: GenerateTokenResult;
            };
        };
    };
    '/api/auth/login': {
        post: {
            req: PostApiAuthLoginData;
            res: {
                /**
                 * OK
                 */
                200: GenerateTokenResult;
                /**
                 * Bad Request
                 */
                400: Array<ValidationFailure>;
            };
        };
    };
    '/api/reports/{id}': {
        get: {
            req: GetApiReportsByIdData;
            res: {
                /**
                 * OK
                 */
                200: GetReportResponse;
                /**
                 * Not Found
                 */
                404: unknown;
            };
        };
        delete: {
            req: DeleteApiReportsByIdData;
            res: {
                /**
                 * No Content
                 */
                204: void;
                /**
                 * Not Found
                 */
                404: unknown;
            };
        };
        patch: {
            req: PatchApiReportsByIdData;
            res: {
                /**
                 * OK
                 */
                200: unknown;
                /**
                 * Not Found
                 */
                404: unknown;
            };
        };
    };
    '/api/reports': {
        get: {
            req: GetApiReportsData;
            res: {
                /**
                 * OK
                 */
                200: Array<GetReportResponse>;
                /**
                 * Not Found
                 */
                404: unknown;
            };
        };
        post: {
            req: PostApiReportsData;
            res: {
                /**
                 * Created
                 */
                201: unknown;
                /**
                 * Bad Request
                 */
                400: Array<Error>;
            };
        };
    };
    '/api/auth/logout': {
        get: {
            req: GetApiAuthLogoutData;
            res: {
                /**
                 * OK
                 */
                200: unknown;
            };
        };
    };
    '/api/auth/token': {
        post: {
            req: PostApiAuthTokenData;
            res: {
                /**
                 * OK
                 */
                200: GenerateTokenResult;
                /**
                 * Bad Request
                 */
                400: GenerateTokenResult;
            };
        };
    };
    '/api/auth/token/introspect': {
        get: {
            res: {
                /**
                 * OK
                 */
                200: GetMeResponse;
            };
        };
    };
};