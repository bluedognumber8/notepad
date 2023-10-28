import { useMutation } from "@apollo/client";
import { GET_IS_USER_LOGGED_IN } from "@/graphql"; // Import your queries
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";

const useAuthMutation = (mutation: any) => {
  const router = useRouter();
  const client = useApolloClient();

  const [executeMutation, { loading, error }] = useMutation(mutation, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signIn || data.signUp);
      client.writeQuery({
        query: GET_IS_USER_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      router.push("/");
    },
  });

  return { executeMutation, loading, error };
};

export default useAuthMutation;
