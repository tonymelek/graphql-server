import './App.css';
import {
  useQuery,
  gql
} from "@apollo/client";
import { useEffect, useState } from 'react';

function App() {
  const widgets = gql`
                      query  {
                        widgets {
                          id
                          description
                          color
                          name
                        }
                      }
                      `
  const { data, loading, error } = useQuery(widgets);
  const [wids, setWids] = useState([])
  useEffect(() => {
    if (!loading && !error) {
      setWids(data.widgets.map(widget => ({ color: widget.color, description: widget.description })))
    }
  }, [data])
  return (
    <div className="App">
      {JSON.stringify(wids, null, 2)}
    </div>
  );
}

export default App;
