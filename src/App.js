import { useQuery, useMutation } from "react-query";
import "./App.css";

const fetchUsers = async () => {
  const res = await fetch("https://reqres.in/api/users");
  return res.json();
};

function App() {
  const { isLoading, data, isError } = useQuery("users", fetchUsers);
  // console.log(data);

  const addUser = async (user) => {
    const res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.first_name,
        email: user.email,
      }),
      headers: {
        "Content-Type": "application/json; chartset=UTF-8",
      },
    });
    return res.json();
  };

  const mutation = useMutation(addUser, {
    onError: (error, variable, context) => {
      console.log("Error");
    },
    onSuccess: (data, variable, context) => {
      console.log(data);
    },
  });

  if (isLoading) {
    return (
      <div className="App">
        <h1>Laden..</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="App">
        <h1>Erreur..</h1>
      </div>
    );
  }

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>user added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({
                first_name: "Rico",
                last_name: "Kells",
                email: "ricokells@aol.com",
              });
            }}
          >
            Create user
          </button>
        </>
      )}
    </div>
  );
}

export default App;
