export function getLoginStatus(): string | null {
    const userId = window.sessionStorage.getItem("loggedUserId");
    return userId;
}