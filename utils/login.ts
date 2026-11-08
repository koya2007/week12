import { logout } from "@/data/credentials";
import type { Credential } from "@/data/credentials";
import { useRouter } from "next/navigation";

type Router = ReturnType<typeof useRouter>;

export const checkLogin = (router: Router, returnPath: string) => {
  localStorage.setItem("returnPath", returnPath);

  const credentialString = localStorage.getItem("credential");
  if (!credentialString) {
    router.replace("/login");
    router.refresh();
    return;
  }

  try {
    const { token, email, name, role }: Credential = JSON.parse(credentialString);

    if (!token || !email || !name || !role) {
      router.replace("/login");
      router.refresh();
      return;
    }

    router.replace(returnPath);
    router.refresh();
  } catch {
    localStorage.removeItem("credential");
    router.replace("/login");
    router.refresh();
  }
};

export const doLogout = (router: Router, returnPath: string) => {
  const credentialString = localStorage.getItem("credential");

  if (!credentialString) {
    router.replace(returnPath);
    router.refresh();
    return;
  }

  try {
    const { token }: Credential = JSON.parse(credentialString);

    logout(token)
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem("credential");
        window.dispatchEvent(new Event("credential-changed"));
        router.replace(returnPath);
        router.refresh();
      });
  } catch {
    localStorage.removeItem("credential");
    router.replace(returnPath);
    router.refresh();
  }
};

export const doLogin = (router: Router, returnPath:string) => {
const credentialString = localStorage.getItem("credential");
 if (credentialString !== null) {
  const { token }: Credential = JSON.parse(credentialString)

  logout(token)
  .then(() =>{})
  .catch(() =>{})
  .finally(() => {
    localStorage.removeItem("credential");
    router.replace(returnPath)
    router.refresh()
    
  })


 }else{
router.replace(returnPath)
router.refresh()

 }
}