import { Card, CardBody, CardHeader } from "@nextui-org/react";
import "./App.css";
import AppHeader from "./components/appHeader";
import AppFooter from "./components/appFooter";

function App() {
  return (
    <>
      <AppHeader />
      <div className="w-[100vw] h-[100vh] flex flex-col items-center px-12 py-6 gap-12">
        <div className="flex flex-col justify-center items-center gap-12">
          {[...Array(10)].map(() => (
            <Card className="w-full max-w-[500px] px-6 py-4">
              <CardHeader className="text-xl">Lorem ipsum dolor sit amet.</CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint deleniti dicta ea nam, unde, animi minus
                dolores sed esse ab voluptates architecto quisquam. Ab amet sequi fugiat nobis. Dolorum in aperiam
                accusamus maiores, inventore, nesciunt amet non ab rem consequatur distinctio esse totam animi velit
                magnam sapiente optio temporibus aspernatur at quod labore cum. Itaque accusantium asperiores nihil
                nobis, quam corrupti nulla culpa, accusamus at eius magnam in quibusdam! Tenetur non, fugiat mollitia
                soluta voluptate dolore ratione beatae deserunt ea quisquam quo nam impedit omnis recusandae inventore
                saepe architecto officia vel sequi doloribus assumenda animi nobis ipsum. Similique, nam inventore.
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <AppFooter />
    </>
  );
}

export default App;
