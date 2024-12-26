import { createContext, useReducer, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/Layouts';
import { initState, reducer } from '~/reducers/userReducer';
import RequireAuthentication from '~/components/Authentication/RequireAuthentication';

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {privateRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <RequireAuthentication>
                      <Layout>
                        <Page />
                      </Layout>
                    </RequireAuthentication>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
