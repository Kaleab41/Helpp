import { Modal } from "flowbite-react"
import { ReactNode } from "react"

interface ModalProps {
  openModal: boolean
  onCloseModal: () => void
  title: string
  className: string
  children: ReactNode
}

const ModalForm = ({ className, openModal, onCloseModal, title, children }: ModalProps) => {
  return (
    <Modal dismissible show={openModal} size="xl" onClose={onCloseModal} popup>
      <Modal.Header>
        <p className="text-2xl  text-teal-600 mt-4 mb-2 ">{title}</p>
      </Modal.Header>
      <Modal.Body className={className}>{children}</Modal.Body>
    </Modal>
  )
}

export default ModalForm
