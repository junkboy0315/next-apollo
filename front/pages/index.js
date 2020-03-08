import { gql, useMutation, useQuery } from "@apollo/client";

const GET_USER = gql`
  {
    user {
      id
      name
    }
  }
`;

const UPDATE_USER = gql`
  mutation($name: String!) {
    updateUser(name: $name) {
      id
      name
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_USER, { ssr: true });
  const [updateUser, { data: updatedData }] = useMutation(UPDATE_USER);

  if (loading) {
    return "Loading...";
  }

  return (
    <>
      <div>{`Hello, ${data?.user.name} - ${data?.user.id}`}</div>
      <button onClick={() => updateUser({ variables: { name: "new name" } })}>
        update user
      </button>
    </>
  );
};

export default Home;
