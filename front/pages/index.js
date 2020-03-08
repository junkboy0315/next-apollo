import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  {
    user {
      id
      name
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_USER, { ssr: true });
  if (loading) {
    return "Loading...";
  }
  return `Hello, ${data?.user.name} - ${data?.user.id}`;
};

export default Home;
