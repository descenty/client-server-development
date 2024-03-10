import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";

const UserNoteShort = () => (
  <Link className="cursor-pointer">
    <Card className="w-full max-w-[400px] max-h-[150px] px-4 py-4">
      <CardHeader className="text-xl text-start py-0">Моя заметка</CardHeader>
      <CardBody className="pb-0 pt-2">
        <p className="tracking-wide text-base whitespace-nowrap text-gray-500 overflow-hidden overflow-ellipsis">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt neque nostrum voluptates voluptate.
          Dignissimos unde temporibus numquam iste quidem earum tempora inventore recusandae sunt voluptatem quo
          corporis aut et sint, sequi nesciunt consectetur. Facere dolorum, ut impedit earum tempore quibusdam rem
          libero accusantium minus doloremque cupiditate quaerat! Necessitatibus est facere alias dignissimos
          perspiciatis odit aut, impedit fugiat aperiam asperiores laborum reiciendis, saepe mollitia corporis enim
          veritatis excepturi modi officiis eligendi accusantium explicabo qui placeat velit? Odio eveniet fugit saepe,
          ipsum sint vitae dolorum porro dignissimos unde, voluptas, voluptatem beatae cum doloribus quaerat officiis.
          Esse quia, iste quisquam fugiat hic id.
        </p>
      </CardBody>
    </Card>
  </Link>
);

export default UserNoteShort;
