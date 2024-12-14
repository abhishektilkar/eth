import { useEffect, useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

async function getter() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await response.json();
  return response;
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  )
}

function Posts() {
  const { data, isLoading, error } = useQuery({ queryKey: ['posts'], queryFn: getter, refetchInterval: 10*1000 });
  console.log(data, isLoading, error)
  if (error) {
    return <div>
      Error while fetching the posts: {JSON.stringify(error)}
    </div>;
  }
  return
    <div>
      App
    </div>
}

export default App
