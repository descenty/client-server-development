import { Card, CardBody, CardHeader } from "@nextui-org/react";
import "./App.css";
import AppHeader from "./components/appHeader";
import TermsOfUse from "./components/termsOfUse";

function App() {
  return (
    <>
      <AppHeader />
      <div className="w-[100vw] h-[100vh] flex flex-col items-center px-12 py-6 gap-12">
        <div className="flex flex-col justify-center items-center gap-12">
          {[...Array(10)].map((value, index) => (
            <Card key={index} className="w-full max-w-[500px] px-6 py-4">
              <CardHeader className="text-xl">Lorem ipsum dolor sit amet.</CardHeader>
              <CardBody>
                <p className="tracking-wide text-base text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt neque nostrum voluptates voluptate.
                  Dignissimos unde temporibus numquam iste quidem earum tempora inventore recusandae sunt voluptatem quo
                  corporis aut et sint, sequi nesciunt consectetur. Facere dolorum, ut impedit earum tempore quibusdam
                  rem libero accusantium minus doloremque cupiditate quaerat! Necessitatibus est facere alias
                  dignissimos perspiciatis odit aut, impedit fugiat aperiam asperiores laborum reiciendis, saepe
                  mollitia corporis enim veritatis excepturi modi officiis eligendi accusantium explicabo qui placeat
                  velit? Odio eveniet fugit saepe, ipsum sint vitae dolorum porro dignissimos unde, voluptas, voluptatem
                  beatae cum doloribus quaerat officiis. Esse quia, iste quisquam fugiat hic id.
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <TermsOfUse />
    </>
  );
}

export default App;
