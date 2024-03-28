import { Modal } from "flowbite-react";
import { ReactNode } from "react";

interface ModalProps {
    openModal: boolean;
    onCloseModal: () => void;
    title: string;
    children: ReactNode;
}

const ModalForm = ({openModal, onCloseModal, title, children}: ModalProps) => {
    return (
        <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default ModalForm;