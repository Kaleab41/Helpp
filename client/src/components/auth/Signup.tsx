import { Button, Label, Modal, TextInput } from "flowbite-react"
import { useState } from "react"

type SingupProp = {
  openSignupModal: boolean
  SetSignupModal: (value: boolean) => void
}

export default function Signup({ openSignupModal, SetSignupModal }: SingupProp) {
  const [email, setEmail] = useState("")

  function onCloseModal() {
    SetSignupModal(false)
    setEmail("")
  }

  return (
    <>
      <Modal show={openSignupModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign up to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-center">
              <Button>Signup</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
