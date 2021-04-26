/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canSuper: currentUser && currentUser.rolecode < 1,
    canAdmin: currentUser && currentUser.rolecode < 2,
    canUser: currentUser && currentUser.rolecode < 3,
  };
}
