export class AuthEndPoint {
    static SignUp = `/api/v1/auth/signup`;
    static SignIn = `/api/v1/auth/signin`;
    static ChangePassword = `/api/v1/auth/changePassword`;
    static DeleteAccount = `/api/v1/auth/deleteMe`;
    static EditProfile = `/api/v1/auth/editProfile`;
    static Logout = `/api/v1/auth/logout`;
    static GetInfo = `/api/v1/auth/profileData`;
    static forgotPassword = `/api/v1/auth/forgotPassword`;
    static Verify = `/api/v1/auth/verifyResetCode`;
    static ResetPassword = `/api/v1/auth/resetPassword`;
}