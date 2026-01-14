// import List from "../components/List";
import ParentComponent from "@/components/parentComponent";
import Counter from "../components/counter";
import ProductCounter from "../components/productCounter";
import Form from "@/components/form";

export default function Home() {
  const name = "madrid";

  return (
    <>
      <p className="text-blue-500">JSX {name}</p>
      <Form />
      {/* <ProductCounter /> */}
      {/* <Counter /> */}
      {/* <ParentComponent /> */}
      {/* <List /> */}
    </>
  );
}
