import {
  Button,
  Checkbox,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const AppFooter = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = useState("auto");
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return (
    <Modal hideCloseButton isDismissable={false} isOpen={isOpen} placement="bottom-center" onOpenChange={onOpenChange}>
      <ModalContent className="p-2">
        <ModalHeader className="text-xl font-normal tracking-widest uppercase">Terms of use</ModalHeader>
        <ModalBody className="flex flex-col justify-between gap-6 p-6">
          <p className="text-left text-gray-400 tracking-widest text-base text-[15px] mt-[-28px] mb-[-8px]">
            Before using the site, please read the user agreement
          </p>
          <Divider />
          <ScrollShadow className="h-64">
            <p className="tracking-wide text-base text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore expedita, magni consequuntur corporis
              laboriosam rerum perspiciatis sunt obcaecati dolorum, ipsa qui dolore ad ex, iste officia tempore
              laudantium vitae quisquam mollitia! Quis asperiores pariatur ratione quod placeat quam itaque obcaecati,
              adipisci ducimus velit rerum libero fugiat aliquid nulla omnis consectetur atque id, nihil dolorem
              reprehenderit laudantium perferendis? Enim rem dolorem animi, error minus a laborum voluptas ipsam, saepe
              officia debitis quis delectus quo ex, fugit asperiores. Labore deserunt velit libero ipsam perspiciatis
              quos natus at accusantium neque consequatur repellendus, aspernatur eos esse repellat asperiores,
              assumenda corporis tenetur suscipit autem. Earum ex optio fuga quis mollitia cumque beatae laboriosam
              quidem, tenetur pariatur obcaecati, quibusdam quos porro quasi alias consectetur quisquam eaque! Modi non
              labore deserunt unde, distinctio mollitia corporis laborum cum sequi animi incidunt ratione eum excepturi
              esse nobis sed dolorem eveniet, nostrum iusto reprehenderit. Tempora nemo quisquam ratione veniam repellat
              nostrum mollitia quis voluptas, illo libero illum perspiciatis odit pariatur cumque recusandae esse
              necessitatibus nulla culpa numquam veritatis distinctio quam ullam cupiditate dicta? Aspernatur quas
              ratione delectus nulla maxime voluptates sequi eveniet voluptatem beatae quod. Illo, minus blanditiis
              maiores odit ipsam reiciendis, labore explicabo et, eius nam iusto sunt. Voluptatibus?
            </p>
          </ScrollShadow>
          <div className="flex flex-row justify-between items-center">
            <Checkbox classNames={{ label: "text-gray-400 tracking-wide text-[15px]" }} className="text-gray-400">
              I agree to the terms of use
            </Checkbox>
            <Button
              color="primary"
              radius="sm"
              className="px-6 self-end w-32 flex-shrink-0 text-gray-300 uppercase tracking-widest font-semibold"
            >
              Accept
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
    //   <footer className="z-10 fixed bottom-0 w-full bg-black flex flex-row items-center gap-12 px-12 py-5">
    //     <Button radius="sm" color="primary" className="px-6 flex-shrink-0 text-gray-300 uppercase tracking-widest text-xs">Terms of Use</Button>
    //     <p className="text-left text-gray-300 tracking-widest text-base text-[15px]">Before using the site, please read the user agreement</p>
    //   </footer>
  );
};

export default AppFooter;
