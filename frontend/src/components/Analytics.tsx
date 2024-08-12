import { lazy, Suspense } from "react";
import ComponentA from "./ComponentA";

const ComponentB = lazy(
  () =>
    new Promise((resolve: any) => {
      setTimeout(() => resolve(import("./ComponentB")), 3000);
    })
);

const Analytics = () => {
  return (
    <div>
      <ComponentA />

      <Suspense fallback={<h2>Loading!!!</h2>}>
        <ComponentB />
      </Suspense>
    </div>
  );
};
export default Analytics;
