import {
  Button,
  Checkbox,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { useCallback, useEffect, useState } from "react";
import { setUserAgree } from "../stores/termsOfUseSlice";

const TermsOfUse = () => {
  const isOpen = useAppSelector((state) => !state.termsOfUse.userAgree);
  const dispatch = useAppDispatch();
  const [agree, setAgree] = useState(false);
  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") setAgree(!agree);
    },
    [agree]
  );
  useEffect(() => {
    setAgree(false);
  }, [isOpen]);
  useEffect(() => {
    isOpen
      ? document.addEventListener("keydown", handleKeyboardEvent)
      : document.removeEventListener("keydown", handleKeyboardEvent);
    return () => document.removeEventListener("keydown", handleKeyboardEvent);
  }, [handleKeyboardEvent, isOpen]);
  return (
    isOpen && (
      <Modal shouldBlockScroll hideCloseButton isDismissable={false} isOpen={isOpen} placement="bottom-center">
        <ModalContent className="p-2">
          <ModalHeader className="text-xl font-normal tracking-widest uppercase">Terms of use</ModalHeader>
          <ModalBody className="flex flex-col justify-between gap-6 p-6">
            <p className="text-left text-gray-400 tracking-wider text-base text-[15px] mt-[-28px] mb-[-8px]">
              Before using the site, please read the user agreement
            </p>
            <Divider />
            <ScrollShadow className="h-64">
              <div className="tracking-wide text-base text-gray-400 flex flex-col gap-2 pb-4">
                <h3 className="font-semibold">1. Introduction</h3>
                <p>
                  This website is operated by Bychenkov A.K. The use of our website is subject to the following terms
                  and conditions of use, as amended from time to time (the “Terms”). The Terms are to be read together
                  by you with any terms, conditions or disclaimers provided in the pages of our website. Please review
                  the Terms carefully. The Terms apply to all users of our website, including without limitation, users
                  who are browsers, customers, merchants, vendors and/or contributors of content. If you access and use
                  this website, you accept and agree to be bound by and comply with the Terms and our Privacy Policy. If
                  you do not agree to the Terms or our Privacy Policy, you are not authorized to access our website, use
                  any of our website's services or place an order on our website.
                </p>
                <h3 className="font-semibold">2. Use of our Website</h3>
                <p>
                  You agree to use our website for legitimate purposes and not for any illegal or unauthorized purpose,
                  including without limitation, in violation of any intellectual property or privacy law. By agreeing to
                  the Terms, you represent and warrant that you are at least the age of majority in your state or
                  province of residence and are legally capable of entering into a binding contract. You agree to not
                  use our website to conduct any activity that would constitute a civil or criminal offence or violate
                  any law. You agree not to attempt to interfere with our website's network or security features or to
                  gain unauthorized access to our systems. You agree to provide us with accurate personal information,
                  such as your email address, mailing address and other contact details in order to complete your order
                  or contact you as needed. You agree to promptly update your account and information. You authorize us
                  to collect and use this information to contact you in accordance with our Privacy Policy.
                </p>
                <h3 className="font-semibold">3. General Conditions </h3>
                <p>
                  We reserve the right to refuse service to anyone, at any time, for any reason. We reserve the right to
                  make any modifications to the website, including terminating, changing, suspending or discontinuing
                  any aspect of the website at any time, without notice. We may impose additional rules or limits on the
                  use of our website. You agree to review the Terms regularly and your continued access or use of our
                  website will mean that you agree to any changes. You agree that we will not be liable to you or any
                  third party for any modification, suspension or discontinuance of our website or for any service,
                  content, feature or product offered through our website.
                </p>
                <h3 className="font-semibold">4. Products or Services </h3>
                <p>
                  All purchases through our website are subject to product availability. We may, in our sole discretion,
                  limit or cancel the quantities offered on our website or limit the sales of our products or services
                  to any person, household, geographic region or jurisdiction. Prices for our products are subject to
                  change, without notice. Unless otherwise indicated, prices displayed on our website are quoted in
                  Canadian dollars. We reserve the right, in our sole discretion, to refuse orders, including without
                  limitation, orders that appear to be placed by distributors or resellers. If we believe that you have
                  made a false or fraudulent order, we will be entitled to cancel the order and inform the relevant
                  authorities. We do not guarantee the accuracy of the colour or design of the products on our website.
                  We have made efforts to ensure the colour and design of our products are displayed as accurately as
                  possible on our website.
                </p>
                <h3 className="font-semibold">5. Links to Third-Party Websites</h3>
                <p>
                  Links from or to websites outside our website are meant for convenience only. We do not review,
                  endorse, approve or control, and are not responsible for any sites linked from or to our website, the
                  content of those sites, the third parties named therein, or their products and services. Linking to
                  any other site is at your sole risk and we will not be responsible or liable for any damages in
                  connection with linking. Links to downloadable software sites are for convenience only and we are not
                  responsible or liable for any difficulties or consequences associated with downloading the software.
                  Use of any downloaded software is governed by the terms of the license agreement, if any, which
                  accompanies or is provided with the software.
                </p>
              </div>
            </ScrollShadow>
            <div className="flex flex-row justify-between items-center">
              <Checkbox
                onChange={(e) => setAgree(e.target.checked)}
                isSelected={agree}
                classNames={{ label: "text-gray-400 tracking-wide text-[15px]" }}
                className="text-gray-400"
              >
                I agree to the terms of use
              </Checkbox>
              <Button
                isDisabled={!agree}
                onClick={() => dispatch(setUserAgree(true))}
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
    )
  );
};

export default TermsOfUse;
