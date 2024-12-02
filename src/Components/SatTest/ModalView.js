import React, { useState, useEffect } from "react";
import Modal from './Modal'; // Import the Modal component
import './Modal.css';

function ModalView() {    
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const closeReportModal = () => {
        setSelectedTestId(null);
        setIsReportModalOpen(false);
    }; 

    return (
        <Modal isOpen={isReportModalOpen} closeModal={closeReportModal}>
            <h2>Delete Test</h2>
            <p>Are you sure you want to delete this test?</p>
            <button onClick={closeReportModal}>Cancel</button>
        </Modal>
    );
}

export default ModalView;
