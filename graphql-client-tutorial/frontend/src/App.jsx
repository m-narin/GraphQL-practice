// npm run devで起動

import './App.css';
import {useQuery,gql} from "@apollo/client";

const BOOKS = gql`
  query{
    books{
      title
      author
    }
  }
`

function Books() {
  const {loading, error, data} = useQuery(BOOKS);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error</p>;
  console.log(data);

  return data.books.map(({title, author}) => (
    <div key = {title}>
      <p>
        {author} : {title}
      </p>
    </div>
  ))
}


function App() {

  return (
    <div className="App">
      <h2>Graphql Client</h2>
      <Books />
    </div>
  )
}

export default App
