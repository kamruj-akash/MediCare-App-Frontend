import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { FieldSeparator } from "../ui/field";
import { toast } from "../ui/toast";

export default function GoogleAuth() {
  const { mutate: googleLogin } = useGoogleOAuth();
  const router = useRouter();
  return (
    <>
      <FieldSeparator className="my-4">OR</FieldSeparator>
      <GoogleLogin
        theme="filled_blue"
        onSuccess={(response: { credential?: string }) => {
          // console.log(response.credential);
          const idToken = response.credential;
          if (!idToken) {
            toast.add({
              title: "Google Login Failed",
              description:
                "No credential received from Google. Please try again.",
              type: "error",
            });
            return;
          }
          // console.log(idToken)
          googleLogin(
            { idToken },
            {
              onSuccess: (res) => {
                toast.add({
                  title: "Google Login Successful",
                  description:
                    res?.message || "You have successfully logged in.",
                  type: "success",
                });
                router.push("/");
              },
              onError: (err) => {
                console.error(err);
                toast.add({
                  title: "Google Login Failed",
                  description: err?.message || "Unable to login with Google.",
                  type: "error",
                });
              },
            },
          );
        }}
        onError={() => {
          toast.add({
            title: "Google Login Failed",
            description: "Unable to login with Google. Please try again.",
            type: "error",
          });
        }}
      />
    </>
  );
}
