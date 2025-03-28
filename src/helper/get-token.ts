
export default function checkToken(cookies: any) {
  if (cookies.get("auth-token")) {
    return true;
  }
  return false;
}
