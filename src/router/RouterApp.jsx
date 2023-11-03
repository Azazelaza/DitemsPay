import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import ContainCheckout from "../components/layout/ContainCheckout";
import Home from "../pages/Home";
import Panel from "../pages/auth/Panel";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLogin } from "../redux/slices/authSlice/thunk";

export const RouterApp = () => {
  const { status, checking } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const InfoContact = lazy(() => import("../pages/checkout/InfoContact"));
  const Address = lazy(() => import("../pages/checkout/Address"));
  const Invoice = lazy(() => import("../pages/checkout/Invoice"));
  const Finally = lazy(() => import("../pages/checkout/Finally"));
  const Thanks = lazy(() => import("../pages/checkout/Thanks"));

  useEffect(() => {
    if (status == "not-auth" && !!localStorage.getItem("token")) {
      dispatch(checkUserLogin());
    }
  }, []);

  if (checking) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <>
          <Route
            path="/checkout/*"
            element={
              <Suspense fallback={<Loading />}>
                <ContainCheckout>
                  <Routes>
                    <Route path="/*" element={<InfoContact />} />
                    {status == "auth" && (
                      <>
                        <Route path="/address" element={<Address />} />
                        <Route path="/invoice" element={<Invoice />} />
                        <Route path="/finally" element={<Finally />} />
                        <Route path="/thanks" element={<Thanks />} />
                      </>
                    )}
                  </Routes>
                </ContainCheckout>
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                {status == "not-auth" ? <Home /> : <Panel />}
              </Suspense>
            }
          />
        </>
      </Routes>
    </>
  );
};
