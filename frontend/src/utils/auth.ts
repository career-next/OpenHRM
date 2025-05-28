/**
 * @file: auth.ts
 */

/**
 * 获取登陆态
 * @returns {{accessToken: string, isLogin: boolean}}
 */
export const useAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    return {
        accessToken,
        isLogin: !!accessToken
    }
}