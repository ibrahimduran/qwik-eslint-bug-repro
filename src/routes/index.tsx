import { DocumentHead } from '@builder.io/qwik-city';
import {
  component$,
  useStore,
  useContext,
  useContextProvider,
  createContext,
} from '@builder.io/qwik';

export interface MyContext {
  count: number;
}
export const MyContext = createContext<MyContext>('my-context');

export const Parent = component$(() => {
  const state = useStore<MyContext>({
    count: 0,
  });

  useContextProvider(MyContext, state); // type checker will ensure the second param is MyContext
  return (
    <>
      <Child />
      <div>Count: {state.count}</div>
    </>
  );
});

export const Child = component$(() => {
  const state = useContext(MyContext); // type of "state" will be `MyContext`
  return (
    <>
      <button onClick$={() => state.count++}>Increment</button>
    </>
  );
});

export default component$(() => {
  return (
    <Parent />
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
